import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {AdminService} from "../admin.service";
import {ResultVO} from "../../domain/result.vo";
import {PageVO} from "../../domain/page.vo";
import {NewsVO} from "../../domain/news.vo";

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class NewsComponent implements OnInit {
  newsList = new Array<NewsVO>();
  page = new PageVO(0, 5);

  constructor(private adminService: AdminService) { }

  ngOnInit() {
    this.findNews();
  }

  findNews() {
    const page = {
      start_index: this.page.pageIndex * this.page.pageSize,
      page_size: this.page.pageSize
    };
    this.adminService.findNews(page)
      .subscribe((result: ResultVO) => {
        console.log(result);
        this.newsList = result.data;
        this.page.totalCount = result.total;
      });
  }

  pageChanged(event: any) {
    this.page.pageIndex = event.pageIndex;
    this.page.pageSize = event.pageSize;
    this.findNews();
  }

}
