import { PARENT_ROUTES } from "../../parentRoutes";

export const SERVICE_PROVIDER_ROUTES = {
  /** Common */
  anyOther: "/*",
  notFound: "/notFound",
  //for payment testing
  payment: "/payment",
  deposit: "/deposit",
  /** Job */
  job: "job/",
  resetJob: PARENT_ROUTES.merchant + "/job/",

  /**  Applications */
  applications: "applications/",
  resetApplications: PARENT_ROUTES.merchant + `/applications/`,
  jobApplication: `jobApplication`,

  /** Offering */
  offering: "offering/",
  create: "create",
  view: "view/",
  edit: "edit/", ///merchant/offering
  resetMerchant: PARENT_ROUTES.merchant + "/offering/",

  /**Profile */
  profile: "profile/",

  /**Deals */

  deals: "deals/",
  deal: "deal/",
  resetDeals: PARENT_ROUTES.merchant + "/deals/",

  /**Sellers */
  sellers: "/sellers",
  sellersNoSlash: "sellers",
  resetSellers: PARENT_ROUTES.merchant + "/sellers",

  /**Dispute Tickets */
  disputeTickets: "/dispute-tickets/",
  receivedDispute: "received/",
  submittedDispute: "submitted/",
  resetDisputeTickets: PARENT_ROUTES.merchant + "/dispute-tickets/",

  /**Settings */
  settings: "/settings",
};
