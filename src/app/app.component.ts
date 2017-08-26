import {Component, OnInit, ViewChild} from '@angular/core';
import {MetadataService} from "./metadata.service";
import {Count} from "./count";
import {Country} from "./country";
import {Year} from "./year";
import {Metadata} from "./metadata";
import {Search} from "./search";
import {SearchResult} from "./search";
import {DataScroller} from "primeng/primeng";
import {Panel} from "primeng/primeng";



declare let L: any;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  @ViewChild(DataScroller) dataScroller: DataScroller;
  @ViewChild(Panel) panelCountry: Panel;
  @ViewChild(Panel) panelYear: Panel;

  //title = 'app';



  //L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
  //maxZoom: 18, attribution: '&copy; 2017 Geoscience Division, Pacific Community (SPC)', id: 'mapbox.streets'
//}).addTo(map);

  constructor(private service: MetadataService) {
  }

  ngOnInit(): void {
    this.getCount()
    this.getCountries()
    this.getYears()
    this.getMetadata()

  }

  count: Count = new Count()
  countries: Country[]
  years: Year[]
  metadataList: Metadata[]
  metadataListCount = 0


  selMetadata: Metadata;
  displayDialog: boolean;
  query: string
  search: Search
  searchCount: string


  filter = "None"

  selectMetadata(metadata: Metadata) {
    this.selMetadata = metadata;
    this.displayDialog = true;
  }

  onDialogHide() {
    this.selMetadata = null;
  }


  getCount(): void {
    this.service.getCount().then(count => this.count = count);
  }

  getCountries(): void {
    this.service.getCountries().then(countries => this.countries = countries);
  }

  getYears(): void {
    this.service.getYears().then(years => this.years = years);
  }

  getMetadata(): void {
    this.service.getMetadata().then(metadataList => {
      this.metadataList = metadataList
      this.metadataListCount = metadataList.length
    });
  }

  getMetadataByCountry(code: string): void {
    this.metadataList = null
    this.dataScroller.reset();
    this.filter = "Country - " + code
    this.service.getMetadataByCountry(code).then(metadataList => {
      this.dataScroller.reset()
      this.metadataList = metadataList
      this.metadataListCount = metadataList.length
    });
    this.panelCountry.collapsed = true
    this.panelYear.collapsed = true
  }

  getMetadataByYear(year: string): void {
    this.metadataList = null
    this.dataScroller.reset();
    this.filter = "Year - " + year
    this.service.getMetadataByYear(year).then(metadataList => {
      this.dataScroller.reset()
      this.metadataList = metadataList
      this.metadataListCount = metadataList.length
    });
    this.panelCountry.collapsed = true
    this.panelYear.collapsed = true
  }

  doSearch(query: string): void {
    this.metadataList = null
    this.dataScroller.reset();
    this.filter = "Search Results - " + query
    this.service.doSearch(query).then(search => {
      this.dataScroller.reset()
      this.search = search
      this.searchCount = search.total + " Results Returned."
      this.metadataList = search.searchResults
      this.metadataListCount = search.total
    });
    this.panelCountry.collapsed = true
    this.panelYear.collapsed = true
  }

  clearList(): void {
    this.metadataList.length = null
    this.metadataListCount = this.metadataList.length
    this.dataScroller.reset()
    this.filter = "Cleared"
    //console.log("Clearing List... - " + this.metadataList.length)
  }

  sortMetadata(col: string): void {
    //console.log("Sorting : " + col + " ...")
    var sortedMetadataList: Metadata[] = this.metadataList.sort((obj1, obj2) => {
      if (col == "title") {
        if (obj1.title > obj2.title) {
          return 1;
        }
        if (obj1.title < obj2.title) {
          return -1;
        }
        return 0;
      }
      if (col == "country") {
        if (obj1.country > obj2.country) {
          return 1;
        }
        if (obj1.country < obj2.country) {
          return -1;
        }
        return 0;
      }
      if (col == "year") {
        if (obj1.period > obj2.period) {
          return 1;
        }
        if (obj1.period < obj2.period) {
          return -1;
        }
        return 0;
      }
    });

    this.metadataList = sortedMetadataList
    this.dataScroller.reset()
    this.panelCountry.collapsed = true



  }


}
