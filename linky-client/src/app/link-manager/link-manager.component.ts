import { Component, OnInit } from '@angular/core';
import link from '../model/link';
import { LinkyClient, handleRequestReject } from '../../api/linkyClient';
import { SortablejsOptions } from 'angular-sortablejs/dist';
import { Router, ActivatedRoute } from '@angular/router';
import { isTouchDevice } from '../../utils/DeviceCheck';

@Component({
  selector: 'app-link-manager',
  templateUrl: './link-manager.component.html',
  styleUrls: ['./link-manager.component.css']
})
export class LinkManagerComponent implements OnInit {
  private router: Router;
  private route: ActivatedRoute;

  loading: boolean = false;

  constructor(r: Router, rt: ActivatedRoute) {
    this.router = r;
    this.route = rt;
  }

  ngOnInit() {
    this.options = {
      onEnd: event => {
        this.changeItemPosition(event.oldIndex, event.newIndex);
      },
      delay: isTouchDevice() ? 200 : 0,
    };

    LinkyClient
      .get('/links')
      .then(resp => {
        if (resp.statusCode === 200) {
          this.links = JSON.parse(resp.body);
        }
      }).catch(handleRequestReject);
  }

  title = 'app';
  links: link[] = [];
  options: SortablejsOptions;

  async changeItemPosition(oldIndex, newIndex) {
    const _link = this.links[newIndex];
    await LinkyClient.patch(`/links/${_link.id}`, {
      json: {
        position: newIndex
      }
    }).catch(handleRequestReject);
  }

  async savedLink(url: string) {
    this.loading = true;
    try {
      const resp = await LinkyClient.post('/links', { json: { url } }).catch(handleRequestReject);
      this.links = resp.body;
    } finally {
      this.loading = false;
    }
  }

  async deleteLink(l: link) {
    await LinkyClient.del(`/links/${l.id}`).catch(handleRequestReject);
    this.links = this.links.filter(lk => lk.id != l.id);
  }
}
