import { Component, OnInit } from '@angular/core';
import link from '../model/link';
import LinkyClient from '../../api/linkyClient';
import linkyClient from '../../api/linkyClient';
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

    linkyClient
      .get('/links')
      .then(resp => {
        if (resp.statusCode === 200) {
          this.links = JSON.parse(resp.body);
        } else if (resp.statusCode === 401) {
          this.router.navigate(['/login']);
        }
      })
      .catch(err => {
        if (err.statusCode === 401) {
          this.router.navigate(['/login']);
        }
      });
  }

  title = 'app';
  links: link[] = [];
  options: SortablejsOptions;

  async changeItemPosition(oldIndex, newIndex) {
    const _link = this.links[newIndex];
    await linkyClient.patch(`/links/${_link.id}`, {
      json: {
        position: newIndex
      }
    });
  }

  async savedLink(url: string) {
    this.loading = true;
    try {
      const resp = await linkyClient.post('/links', { json: { url } });
      this.links = resp.body;
    } finally {
      this.loading = false;
    }
  }

  async deleteLink(l: link) {
    await linkyClient.del(`/links/${l.id}`);
    this.links = this.links.filter(lk => lk.id != l.id);
  }
}
