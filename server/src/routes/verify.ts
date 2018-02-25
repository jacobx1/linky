import { Router, Request, Response } from "express";
import { getConnection } from "typeorm";
import { User } from "../entity/User";
import * as uuidRandom from 'uuid/v4';
import { sendVerifyEmail } from "../email/verify";
import { authenticated, checkLogin } from "../auth";

const verifyUser = async (req: Request, res: Response) => {
  const key = req.params.key;
  const userRepo = getConnection().getRepository(User);
  const usr = await userRepo.findOne({ verifyKey: key});
  if (usr && usr.verifyKey === key) {
    usr.activated = true;
    await userRepo.save(usr);
    res.redirect('/');
    return;
  }

  res.status(400).send('Bad verification key');
}

const reVerifyUser = async (req: Request, res: Response) => {
  if (req.user) {
    const user: User = req.user;
    user.verifyKey = uuidRandom();
    await sendVerifyEmail(user.email, user.verifyKey);
    await getConnection().getRepository(User).save(user);
    res.status(200).send('Sent');
    return;
  }

  res.status(400).send('Not logged in');
}

export const VerifyRoute = Router()
  .get('/:key', verifyUser)
  .post('/', checkLogin, reVerifyUser);
