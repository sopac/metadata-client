export class Search {

  total: number;
  searchResults: SearchResult[];

}

export class SearchResult {
  id: number;
  abstractText: string;
  boundingEast: string;
  boundingNorth: string;
  boundingSouth: string;
  boundingWest: string;
  country: string;
  dataQuality: string;
  description: string;
  purpose: string;
  keywords: string;
  period: string;
  personnelDesignation: string;
  personnelName: string;
  publicFiles: string;
  referenceSystem: string;
  statement: string;
  supplementalInformation: string;
  title: string;
  xml: string;
}
