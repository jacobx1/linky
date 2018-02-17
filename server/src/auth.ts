import { Strategy } from 'passport-local';
import { getConnection } from 'typeorm';
import { User } from './entity/User';
import { Express, NextFunction, Request, Response } from 'express';

import * as cookieParser from 'cookie-parser';
import * as expressSession from 'express-session';
import * as passport from 'passport';

passport.use(
  new Strategy((username, password, done) => {
    const failed = () => done('Bad login', null, { message: 'Bad login' });
    const connection = getConnection();

    const userRepo = connection.getRepository(User);
    userRepo
      .findOne({ username, password })
      .then(user => {
        if (user) {
          done(null, user);
        } else {
          failed();
        }
      })
      .catch(error => {
        failed();
      });
  })
);

passport.serializeUser((user: User, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  const connection = getConnection();
  const userRepo = connection.getRepository(User);
  const failed = () => done('NO USER', null);
  userRepo
    .findOneById(id)
    .then(user => {
      if (user) {
        done(null, user);
      } else {
        failed();
      }
    })
    .catch(error => {
      failed();
    });
});

export function authenticated(request, response, next) {
  if (request.user) {
    return next();
  }
  response.send(401, 'User not authenticated');
}

const signup = (req: Request, res: Response) => {
  const { email, username, password, passwordConfirm } = req.body;

  getConnection()
    .transaction(async em => {
      const userRepo = em.getRepository(User);
      const existingUser = await userRepo.findOne({ username });
      if (existingUser || password !== passwordConfirm) throw 'Existing user';

      const newUser = userRepo.create();
      newUser.username = username;
      newUser.password = password;
      newUser.email = email;

      await userRepo.save(newUser);
    })
    .then(() => res.status(201).send('created'), () => res.status(400).send())
    .catch(() => res.status(400).send('error'));
};

export function configureApp(
  app: Express,
  authEndpoint: string,
  signupEndpoint: string
) {
  app.use(cookieParser());
  app.use(
    expressSession({
      secret: 'whoah dude',
      cookie: {
        secure: false,
        httpOnly: false
      }
    })
  );
  app.use(passport.initialize());
  app.use(passport.session());
  app.post(authEndpoint, passport.authenticate('local'), (req, res) => {
    res.end('success');
  });
  app.post(signupEndpoint, signup);
}
