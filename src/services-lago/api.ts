/* eslint-disable */
/* tslint:disable */
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

import {Blob, File, FormData} from "formdata-node";

export interface AddOnBaseInput {
  /**
   * The name of the add-on.
   * @example "Setup Fee"
   */
  name?: string;
  /**
   * Unique code used to identify the add-on.
   * @example "setup_fee"
   */
  code?: string;
  /**
   * The cost of the add-on in cents, excluding any applicable taxes, that is billed to a customer. By creating a one-off invoice, you will be able to override this value.
   * @example 50000
   */
  amount_cents?: number;
  /** The currency of the add-on. */
  amount_currency?: Currency;
  /**
   * The description of the add-on.
   * @example "Implementation fee for new customers."
   */
  description?: string | null;
  /**
   * List of unique code used to identify the taxes.
   * @example ["french_standard_vat"]
   */
  tax_codes?: string[];
}

export interface AddOnCreateInput {
  add_on: AddOnBaseInput;
}

export interface AddOnObject {
  /**
   * Unique identifier of the add-on, created by Lago.
   * @format uuid
   * @example "1a901a90-1a90-1a90-1a90-1a901a901a90"
   */
  lago_id: string;
  /**
   * The name of the add-on.
   * @example "Setup Fee"
   */
  name: string;
  /**
   * Unique code used to identify the add-on.
   * @example "setup_fee"
   */
  code: string;
  /**
   * The cost of the add-on in cents, excluding any applicable taxes, that is billed to a customer. By creating a one-off invoice, you will be able to override this value.
   * @example 50000
   */
  amount_cents: number;
  /** The currency of the add-on. */
  amount_currency: Currency;
  /**
   * The description of the add-on.
   * @example "Implementation fee for new customers."
   */
  description?: string | null;
  /**
   * The date and time when the add-on was created. It is expressed in UTC format according to the ISO 8601 datetime standard. This field provides the timestamp for the exact moment when the add-on was initially created.
   * @format date-time
   * @example "2022-04-29T08:59:51Z"
   */
  created_at: string;
  /** All taxes applied to the add-on. */
  taxes?: TaxObject[];
}

export interface AddOn {
  add_on: AddOnObject;
}

export interface AddOnsPaginated {
  add_ons: AddOnObject[];
  meta: PaginationMeta;
}

export interface AddOnUpdateInput {
  add_on: AddOnBaseInput;
}

export interface ApiErrorBadRequest {
  /**
   * @format int32
   * @example 400
   */
  status: number;
  /** @example "Bad request" */
  error: string;
}

export interface ApiErrorForbidden {
  /**
   * @format int32
   * @example 403
   */
  status: number;
  /** @example "Forbidden" */
  error: string;
  /** @example "feature_unavailable" */
  code: string;
}

export interface ApiErrorUnauthorized {
  /**
   * @format int32
   * @example 401
   */
  status: number;
  /** @example "Unauthorized" */
  error: string;
}

export interface ApiErrorUnprocessableEntity {
  /**
   * @format int32
   * @example 422
   */
  status: number;
  /** @example "Unprocessable entity" */
  error: string;
  /** @example "validation_errors" */
  code: string;
  error_details: object;
}

export interface ApiErrorNotAllowed {
  /**
   * @format int32
   * @example 405
   */
  status: number;
  /** @example "Method Not Allowed" */
  error: string;
  /** @example "not_allowed" */
  code: string;
}

export interface ApiErrorNotFound {
  /**
   * @format int32
   * @example 404
   */
  status: number;
  /** @example "Not Found" */
  error: string;
  /** @example "object_not_found" */
  code: string;
}

export interface AppliedCoupon {
  applied_coupon: AppliedCouponObject;
}

export interface AppliedCouponInput {
  applied_coupon: {
    /**
     * The customer external unique identifier (provided by your own application)
     * @example "5eb02857-a71e-4ea2-bcf9-57d3a41bc6ba"
     */
    external_customer_id: string;
    /**
     * Unique code used to identify the coupon.
     * @example "startup_deal"
     */
    coupon_code: string;
    /**
     * The type of frequency for the coupon. It can have three possible values: `once`, `recurring` or `forever`.
     *
     * - If set to `once`, the coupon is applicable only for a single use.
     * - If set to `recurring`, the coupon can be used multiple times for recurring billing periods.
     * - If set to `forever`, the coupon has unlimited usage and can be applied indefinitely.
     * @example "recurring"
     */
    frequency?: 'once' | 'recurring' | null;
    /**
     * Specifies the number of billing periods to which the coupon applies. This field is required only for coupons with a `recurring` frequency type
     * @example 3
     */
    frequency_duration?: number | null;
    /**
     * The amount of the coupon in cents. This field is required only for coupon with `fixed_amount` type.
     * @example 2000
     */
    amount_cents?: number | null;
    /** The currency of the coupon. This field is required only for coupon with `fixed_amount` type. */
    amount_currency?: Currency;
    /**
     * The percentage rate of the coupon. This field is required only for coupons with a `percentage` coupon type.
     * @pattern ^[0-9]+.?[0-9]*$
     * @example null
     */
    percentage_rate?: string | null;
  };
}

export interface AppliedCouponObject {
  /**
   * Unique identifier of the applied coupon, created by Lago.
   * @format uuid
   * @example "1a901a90-1a90-1a90-1a90-1a901a901a90"
   */
  lago_id: string;
  /**
   * Unique identifier of the coupon, created by Lago.
   * @format uuid
   * @example "1a901a90-1a90-1a90-1a90-1a901a901a90"
   */
  lago_coupon_id: string;
  /**
   * Unique code used to identify the coupon.
   * @example "startup_deal"
   */
  coupon_code: string;
  /**
   * The name of the coupon.
   * @example "Startup Deal"
   */
  coupon_name: string;
  /**
   * Unique identifier of the customer, created by Lago.
   * @format uuid
   * @example "1a901a90-1a90-1a90-1a90-1a901a901a90"
   */
  lago_customer_id: string;
  /**
   * The customer external unique identifier (provided by your own application)
   * @example "5eb02857-a71e-4ea2-bcf9-57d3a41bc6ba"
   */
  external_customer_id: string;
  /**
   * The status of the coupon. Can be either `active` or `terminated`.
   * @example "active"
   */
  status: 'active' | 'terminated';
  /**
   * The amount of the coupon in cents. This field is required only for coupon with `fixed_amount` type.
   * @example 2000
   */
  amount_cents?: number | null;
  /**
   * The remaining amount in cents for a `fixed_amount` coupon with a frequency set to `once`. This field indicates the remaining balance or value that can still be utilized from the coupon.
   * @example 50
   */
  amount_cents_remaining?: number | null;
  /** The currency of the coupon. This field is required only for coupon with `fixed_amount` type. */
  amount_currency?: Currency;
  /**
   * The percentage rate of the coupon. This field is required only for coupons with a `percentage` coupon type.
   * @pattern ^[0-9]+.?[0-9]*$
   * @example null
   */
  percentage_rate?: string | null;
  /**
   * The type of frequency for the coupon. It can have three possible values: `once`, `recurring` or `forever`.
   *
   * - If set to `once`, the coupon is applicable only for a single use.
   * - If set to `recurring`, the coupon can be used multiple times for recurring billing periods.
   * - If set to `forever`, the coupon has unlimited usage and can be applied indefinitely.
   * @example "recurring"
   */
  frequency: 'once' | 'recurring';
  /**
   * Specifies the number of billing periods to which the coupon applies. This field is required only for coupons with a `recurring` frequency type
   * @example 3
   */
  frequency_duration?: number | null;
  /**
   * The remaining number of billing periods to which the coupon is applicable. This field determines the remaining usage or availability of the coupon based on the remaining billing periods.
   * @example 1
   */
  frequency_duration_remaining?: number | null;
  /**
   * The date and time after which the coupon will stop applying to customer's invoices. Once the expiration date is reached, the coupon will no longer be applicable, and any further invoices generated for the customer will not include the coupon discount.
   * @format date-time
   * @example "2022-04-29T08:59:51Z"
   */
  expiration_at?: string | null;
  /**
   * The date and time when the coupon was assigned to a customer. It is expressed in UTC format according to the ISO 8601 datetime standard.
   * @format date-time
   * @example "2022-04-29T08:59:51Z"
   */
  created_at: string;
  /**
   * This field indicates the specific moment when the coupon amount is fully utilized or when the coupon is removed from the customer's coupon list. It is expressed in UTC format according to the ISO 8601 datetime standard.
   * @format date-time
   * @example "2022-04-29T08:59:51Z"
   */
  terminated_at?: string | null;
}

export type AppliedCouponObjectExtended = AppliedCouponObject & {
  credits: CreditObject[];
};

export interface AppliedCouponsPaginated {
  applied_coupons: AppliedCouponObjectExtended[];
  meta: PaginationMeta;
}

export interface BaseAppliedTax {
  /**
   * Unique identifier of the applied tax, created by Lago.
   * @format uuid
   * @example "1a901a90-1a90-1a90-1a90-1a901a901a90"
   */
  lago_id?: string;
  /**
   * Unique identifier of the tax, created by Lago.
   * @format uuid
   * @example "1a901a90-1a90-1a90-1a90-1a901a901a90"
   */
  lago_tax_id?: string;
  /**
   * Name of the tax.
   * @example "TVA"
   */
  tax_name?: string;
  /**
   * Unique code used to identify the tax associated with the API request.
   * @example "french_standard_vat"
   */
  tax_code?: string;
  /**
   * The percentage rate of the tax
   * @example 20
   */
  tax_rate?: number;
  /**
   * Internal description of the taxe
   * @example "French standard VAT"
   */
  tax_description?: string;
  /**
   * Amount of the tax
   * @example 2000
   */
  amount_cents?: number;
  /** Currency of the tax */
  amount_currency?: Currency;
  /**
   * The date and time when the applied tax was created. It is expressed in UTC format according to the ISO 8601 datetime standard. This field provides the timestamp for the exact moment when the applied tax was initially created.
   * @format date-time
   * @example "2022-09-14T16:35:31Z"
   */
  created_at?: string;
}

export interface BillableMetric {
  billable_metric: BillableMetricObject;
}

export interface BillableMetricObject {
  /**
   * Unique identifier of the billable metric created by Lago.
   * @format uuid
   * @example "1a901a90-1a90-1a90-1a90-1a901a901a90"
   */
  lago_id: string;
  /**
   * Name of the billable metric.
   * @example "Storage"
   */
  name: string;
  /**
   * Unique code used to identify the billable metric associated with the API request. This code associates each event with the correct metric.
   * @example "storage"
   */
  code: string;
  /**
   * Internal description of the billable metric.
   * @example "GB of storage used in my application"
   */
  description?: string | null;
  /**
   * Defines if the billable metric is persisted billing period over billing period.
   *
   * - If set to `true`: the accumulated number of units calculated from the previous billing period is persisted to the next billing period.
   * - If set to `false`: the accumulated number of units is reset to 0 at the end of the billing period.
   * - If not defined in the request, default value is `false`.
   * @example false
   */
  recurring: boolean;
  /**
   * Creation date of the billable metric.
   * @format date-time
   * @example "2022-09-14T16:35:31Z"
   */
  created_at: string;
  /**
   * Property of the billable metric used for aggregating usage data. This field is not required for `count_agg`.
   * @example "gb"
   */
  field_name?: string | null;
  /**
   * Aggregation method used to compute usage for this billable metric. Possible values are `count_agg`, `sum_agg`, `max_agg` or `unique_count_agg`.
   * @example "sum_agg"
   */
  aggregation_type: 'count_agg' | 'sum_agg' | 'max_agg' | 'unique_count_agg';
  /** Group with one or two dimensions, used to apply differentiated pricing based on additional properties of the billable metric. */
  group?: BillableMetricGroup;
  /**
   * Number of active subscriptions using this billable metric.
   * @example 4
   */
  active_subscriptions_count: number;
  /**
   * Number of draft invoices for which this billable metric is listed as an invoice item.
   * @example 10
   */
  draft_invoices_count: number;
  /**
   * Number of plans using this billable metric.
   * @example 4
   */
  plans_count: number;
}

export interface BillableMetricBaseInput {
  /**
   * Name of the billable metric.
   * @example "Storage"
   */
  name?: string;
  /**
   * Unique code used to identify the billable metric associated with the API request. This code associates each event with the correct metric.
   * @example "storage"
   */
  code?: string;
  /**
   * Internal description of the billable metric.
   * @example "GB of storage used in my application"
   */
  description?: string | null;
  /**
   * Defines if the billable metric is persisted billing period over billing period.
   *
   * - If set to `true`: the accumulated number of units calculated from the previous billing period is persisted to the next billing period.
   * - If set to `false`: the accumulated number of units is reset to 0 at the end of the billing period.
   * - If not defined in the request, default value is `false`.
   * @example false
   */
  recurring?: boolean;
  /**
   * Property of the billable metric used for aggregating usage data. This field is not required for `count_agg`.
   * @example "gb"
   */
  field_name?: string | null;
  /**
   * Aggregation method used to compute usage for this billable metric. Possible values are `count_agg`, `sum_agg`, `max_agg` or `unique_count_agg`.
   * @example "sum_agg"
   */
  aggregation_type?: 'count_agg' | 'sum_agg' | 'max_agg' | 'unique_count_agg';
  /** Group with one or two dimensions, used to apply differentiated pricing based on additional properties of the billable metric. */
  group?: BillableMetricGroup;
}

export interface BillableMetricCreateInput {
  billable_metric: BillableMetricBaseInput;
}

export interface BillableMetricUpdateInput {
  billable_metric: BillableMetricBaseInput;
}

/** Group with one or two dimensions, used to apply differentiated pricing based on additional properties of the billable metric. */
export interface BillableMetricGroup {
  /**
   * Name of the event property used to group values.
   * @example "region"
   */
  key: string;
  /**
   * Array of strings or objects representing all possible values.
   * @example ["us-east-1","us-east-2","eu-west-1"]
   */
  values: (
    | string
    | {
        /**
         * Name of the event property used to group values.
         * @example "region"
         */
        key: string;
        /**
         * Array of strings representing all possible values.
         * @example ["us-east-1","us-east-2","eu-west-1"]
         */
        values: string[];
      }
  )[];
}

export interface BillableMetricsPaginated {
  billable_metrics: BillableMetricObject[];
  meta: PaginationMeta;
}

export interface ChargeObject {
  /**
   * Unique identifier of charge, created by Lago.
   * @format uuid
   * @example "1a901a90-1a90-1a90-1a90-1a901a901a90"
   */
  lago_id: string;
  /**
   * Unique identifier of the billable metric created by Lago.
   * @format uuid
   * @example "1a901a90-1a90-1a90-1a90-1a901a901a90"
   */
  lago_billable_metric_id: string;
  /**
   * Unique code identifying a billable metric.
   * @example "requests"
   */
  billable_metric_code: string;
  /**
   * The date and time when the charge was created. It is expressed in UTC format according to the ISO 8601 datetime standard.
   * @format date-time
   * @example "2022-09-14T16:35:31Z"
   */
  created_at: string;
  /** Specifies the pricing model used for the calculation of the final fee. It can be `standard`, `graduated`, `graduated_percentage`, `package`, `percentage` or `volume`. */
  charge_model: 'standard' | 'graduated' | 'graduated_percentage' | 'package' | 'percentage' | 'volume';
  /**
   * This field determines the billing timing for this specific usage-based charge. When set to `true`, the charge is due and invoiced immediately. Conversely, when set to `false`, the charge is due and invoiced at the end of each billing period.
   * @example true
   */
  pay_in_advance?: boolean;
  /**
   * This field specifies whether the charge should be included in a proper invoice. If set to `false`, no invoice will be issued for this charge. You can only set it to `false` when `pay_in_advance` is `true`.
   * @example true
   */
  invoiceable?: boolean;
  /**
   * Specifies whether a charge is prorated based on the remaining number of days in the billing period or billed fully.
   *
   * - If set to `true`, the charge is prorated based on the remaining days in the current billing period.
   * - If set to `false`, the charge is billed in full.
   * - If not defined in the request, default value is `false`.
   * @example false
   */
  prorated?: boolean;
  /**
   * The minimum spending amount required for the charge, measured in cents and excluding any applicable taxes. It indicates the minimum amount that needs to be charged for each billing period.
   * @example 1200
   */
  min_amount_cents?: number;
  /** List of all thresholds utilized for calculating the charge. */
  properties?: ChargeProperties;
  /** All charge information, sorted by groups. */
  group_properties?: GroupPropertiesObject[];
  /** All taxes applied to the charge. */
  taxes?: TaxObject[];
}

export interface ChargeProperties {
  /** Graduated ranges, sorted from bottom to top tiers, used for a `graduated` charge model. */
  graduated_ranges?: {
    /**
     * Specifies the lower value of a tier for a `graduated` charge model. It must be either 0 or the previous range's `to_value + 1` to maintain the proper sequence of values.
     * @example 0
     */
    from_value: number;
    /**
     * Specifies the highest value of a tier for a `graduated` charge model.
     * - This value must be higher than the from_value of the same tier.
     * - This value must be null for the last tier.
     * @example 10
     */
    to_value: number | null;
    /**
     * The flat amount for a whole tier, excluding tax, for a `graduated` charge model. It is expressed as a decimal value.
     * @pattern ^[0-9]+.?[0-9]*$
     * @example "10"
     */
    flat_amount: string;
    /**
     * The unit price, excluding tax, for a specific tier of a `graduated` charge model. It is expressed as a decimal value.
     * @pattern ^[0-9]+.?[0-9]*$
     * @example "0.5"
     */
    per_unit_amount: string;
  }[];
  /** Graduated percentage ranges, sorted from bottom to top tiers, used for a `graduated_percentage` charge model. */
  graduated_percentage_ranges?: {
    /**
     * Specifies the lower value of a tier for a `graduated_percentage` charge model. It must be either 0 or the previous range's `to_value + 1` to maintain the proper sequence of values.
     * @example 0
     */
    from_value: number;
    /**
     * Specifies the highest value of a tier for a `graduated_percentage` charge model.
     * - This value must be higher than the from_value of the same tier.
     * - This value must be null for the last tier.
     * @example 10
     */
    to_value: number | null;
    /**
     * The percentage rate that is applied to the amount of each transaction in the tier for a `graduated_percentage` charge model. It is expressed as a decimal value.
     * @format ^[0-9]+.?[0-9]*$
     * @example "1"
     */
    rate: string;
    /**
     * The flat amount for a whole tier, excluding tax, for a `graduated_percentage` charge model. It is expressed as a decimal value.
     * @format ^[0-9]+.?[0-9]*$
     * @example "10"
     */
    flat_amount: string;
  }[];
  /**
   * - The unit price, excluding tax, for a `standard` charge model. It is expressed as a decimal value.
   * - The amount, excluding tax, for a complete set of units in a `package` charge model. It is expressed as a decimal value.
   * @pattern ^[0-9]+.?[0-9]*$
   * @example "30"
   */
  amount?: string;
  /**
   * The quantity of units that are provided free of charge for each billing period in a `package` charge model. This field specifies the number of units that customers can use without incurring any additional cost during each billing cycle.
   * @example 100
   */
  free_units?: number;
  /**
   * The quantity of units included in each pack or set for a `package` charge model. It indicates the number of units that are bundled together as a single package or set within the pricing structure.
   * @example 1000
   */
  package_size?: number;
  /**
   * The percentage rate that is applied to the amount of each transaction for a `percentage` charge model. It is expressed as a decimal value.
   * @pattern ^[0-9]+.?[0-9]*$
   * @example "1"
   */
  rate?: string;
  /**
   * The fixed fee that is applied to each transaction for a `percentage` charge model. It is expressed as a decimal value.
   * @pattern ^[0-9]+.?[0-9]*$
   * @example "0.5"
   */
  fixed_amount?: string;
  /**
   * The count of transactions that are not impacted by the `percentage` rate and fixed fee in a percentage charge model. This field indicates the number of transactions that are exempt from the calculation of charges based on the specified percentage rate and fixed fee.
   * @example 5
   */
  free_units_per_events?: number | null;
  /**
   * The transaction amount that is not impacted by the `percentage` rate and fixed fee in a percentage charge model. This field indicates the portion of the transaction amount that is exempt from the calculation of charges based on the specified percentage rate and fixed fee.
   * @pattern ^[0-9]+.?[0-9]*$
   * @example "500"
   */
  free_units_per_total_aggregation?: string | null;
  /**
   * Specifies the maximum allowable spending for a single transaction. Working as a transaction cap.
   * @format ^[0-9]+.?[0-9]*$
   * @example "3.75"
   */
  per_transaction_max_amount?: string | null;
  /**
   * Specifies the minimum allowable spending for a single transaction. Working as a transaction floor.
   * @format ^[0-9]+.?[0-9]*$
   * @example "1.75"
   */
  per_transaction_min_amount?: string | null;
  /** Volume ranges, sorted from bottom to top tiers, used for a `volume` charge model. */
  volume_ranges?: {
    /**
     * Specifies the lower value of a tier for a `volume` charge model. It must be either 0 or the previous range's `to_value + 1` to maintain the proper sequence of values.
     * @example 0
     */
    from_value: number;
    /**
     * Specifies the highest value of a tier for a `volume` charge model.
     * - This value must be higher than the `from_value` of the same tier.
     * - This value must be `null` for the last tier.
     * @example 10
     */
    to_value: number | null;
    /**
     * The unit price, excluding tax, for a specific tier of a `volume` charge model. It is expressed as a decimal value.
     * @pattern ^[0-9]+.?[0-9]*$
     * @example "10"
     */
    flat_amount: string;
    /**
     * The flat amount for a whole tier, excluding tax, for a `volume` charge model. It is expressed as a decimal value.
     * @pattern ^[0-9]+.?[0-9]*$
     * @example "0.5"
     */
    per_unit_amount: string;
  }[];
}

/** @example "US" */
export enum Country {
  AD = 'AD',
  AE = 'AE',
  AF = 'AF',
  AG = 'AG',
  AI = 'AI',
  AL = 'AL',
  AM = 'AM',
  AO = 'AO',
  AQ = 'AQ',
  AR = 'AR',
  AS = 'AS',
  AT = 'AT',
  AU = 'AU',
  AW = 'AW',
  AX = 'AX',
  AZ = 'AZ',
  BA = 'BA',
  BB = 'BB',
  BD = 'BD',
  BE = 'BE',
  BF = 'BF',
  BG = 'BG',
  BH = 'BH',
  BI = 'BI',
  BJ = 'BJ',
  BL = 'BL',
  BM = 'BM',
  BN = 'BN',
  BO = 'BO',
  BQ = 'BQ',
  BR = 'BR',
  BS = 'BS',
  BT = 'BT',
  BV = 'BV',
  BW = 'BW',
  BY = 'BY',
  BZ = 'BZ',
  CA = 'CA',
  CC = 'CC',
  CD = 'CD',
  CF = 'CF',
  CG = 'CG',
  CH = 'CH',
  CI = 'CI',
  CK = 'CK',
  CL = 'CL',
  CM = 'CM',
  CN = 'CN',
  CO = 'CO',
  CR = 'CR',
  CU = 'CU',
  CV = 'CV',
  CW = 'CW',
  CX = 'CX',
  CY = 'CY',
  CZ = 'CZ',
  DE = 'DE',
  DJ = 'DJ',
  DK = 'DK',
  DM = 'DM',
  DO = 'DO',
  DZ = 'DZ',
  EC = 'EC',
  EE = 'EE',
  EG = 'EG',
  EH = 'EH',
  ER = 'ER',
  ES = 'ES',
  ET = 'ET',
  FI = 'FI',
  FJ = 'FJ',
  FK = 'FK',
  FM = 'FM',
  FO = 'FO',
  FR = 'FR',
  GA = 'GA',
  GB = 'GB',
  GD = 'GD',
  GE = 'GE',
  GF = 'GF',
  GG = 'GG',
  GH = 'GH',
  GI = 'GI',
  GL = 'GL',
  GM = 'GM',
  GN = 'GN',
  GP = 'GP',
  GQ = 'GQ',
  GR = 'GR',
  GS = 'GS',
  GT = 'GT',
  GU = 'GU',
  GW = 'GW',
  GY = 'GY',
  HK = 'HK',
  HM = 'HM',
  HN = 'HN',
  HR = 'HR',
  HT = 'HT',
  HU = 'HU',
  ID = 'ID',
  IE = 'IE',
  IL = 'IL',
  IM = 'IM',
  IN = 'IN',
  IO = 'IO',
  IQ = 'IQ',
  IR = 'IR',
  IS = 'IS',
  IT = 'IT',
  JE = 'JE',
  JM = 'JM',
  JO = 'JO',
  JP = 'JP',
  KE = 'KE',
  KG = 'KG',
  KH = 'KH',
  KI = 'KI',
  KM = 'KM',
  KN = 'KN',
  KP = 'KP',
  KR = 'KR',
  KW = 'KW',
  KY = 'KY',
  KZ = 'KZ',
  LA = 'LA',
  LB = 'LB',
  LC = 'LC',
  LI = 'LI',
  LK = 'LK',
  LR = 'LR',
  LS = 'LS',
  LT = 'LT',
  LU = 'LU',
  LV = 'LV',
  LY = 'LY',
  MA = 'MA',
  MC = 'MC',
  MD = 'MD',
  ME = 'ME',
  MF = 'MF',
  MG = 'MG',
  MH = 'MH',
  MK = 'MK',
  ML = 'ML',
  MM = 'MM',
  MN = 'MN',
  MO = 'MO',
  MP = 'MP',
  MQ = 'MQ',
  MR = 'MR',
  MS = 'MS',
  MT = 'MT',
  MU = 'MU',
  MV = 'MV',
  MW = 'MW',
  MX = 'MX',
  MY = 'MY',
  MZ = 'MZ',
  NA = 'NA',
  NC = 'NC',
  NE = 'NE',
  NF = 'NF',
  NG = 'NG',
  NI = 'NI',
  NL = 'NL',
  NO = 'NO',
  NP = 'NP',
  NR = 'NR',
  NU = 'NU',
  NZ = 'NZ',
  OM = 'OM',
  PA = 'PA',
  PE = 'PE',
  PF = 'PF',
  PG = 'PG',
  PH = 'PH',
  PK = 'PK',
  PL = 'PL',
  PM = 'PM',
  PN = 'PN',
  PR = 'PR',
  PS = 'PS',
  PT = 'PT',
  PW = 'PW',
  PY = 'PY',
  QA = 'QA',
  RE = 'RE',
  RO = 'RO',
  RS = 'RS',
  RU = 'RU',
  RW = 'RW',
  SA = 'SA',
  SB = 'SB',
  SC = 'SC',
  SD = 'SD',
  SE = 'SE',
  SG = 'SG',
  SH = 'SH',
  SI = 'SI',
  SJ = 'SJ',
  SK = 'SK',
  SL = 'SL',
  SM = 'SM',
  SN = 'SN',
  SO = 'SO',
  SR = 'SR',
  SS = 'SS',
  ST = 'ST',
  SV = 'SV',
  SX = 'SX',
  SY = 'SY',
  SZ = 'SZ',
  TC = 'TC',
  TD = 'TD',
  TF = 'TF',
  TG = 'TG',
  TH = 'TH',
  TJ = 'TJ',
  TK = 'TK',
  TL = 'TL',
  TM = 'TM',
  TN = 'TN',
  TO = 'TO',
  TR = 'TR',
  TT = 'TT',
  TV = 'TV',
  TW = 'TW',
  TZ = 'TZ',
  UA = 'UA',
  UG = 'UG',
  UM = 'UM',
  US = 'US',
  UY = 'UY',
  UZ = 'UZ',
  VA = 'VA',
  VC = 'VC',
  VE = 'VE',
  VG = 'VG',
  VI = 'VI',
  VN = 'VN',
  VU = 'VU',
  WF = 'WF',
  WS = 'WS',
  YE = 'YE',
  YT = 'YT',
  ZA = 'ZA',
  ZM = 'ZM',
  ZW = 'ZW',
}

export interface Coupon {
  coupon: CouponObject;
}

export interface CouponBaseInput {
  /**
   * The name of the coupon.
   * @example "Startup Deal"
   */
  name?: string;
  /**
   * Unique code used to identify the coupon.
   * @example "startup_deal"
   */
  code?: string;
  /**
   * Description of the coupon.
   * @example "I am a coupon description"
   */
  description?: string | null;
  /**
   * The type of the coupon. It can have two possible values: `fixed_amount` or `percentage`.
   *
   * - If set to `fixed_amount`, the coupon represents a fixed amount discount.
   * - If set to `percentage`, the coupon represents a percentage-based discount.
   * @example "fixed_amount"
   */
  coupon_type?: 'fixed_amount' | 'percentage';
  /**
   * The amount of the coupon in cents. This field is required only for coupon with `fixed_amount` type.
   * @example 5000
   */
  amount_cents?: number | null;
  /** The currency of the coupon. This field is required only for coupon with `fixed_amount` type. */
  amount_currency?: Currency;
  /**
   * Indicates whether the coupon can be reused or not. If set to `true`, the coupon is reusable, meaning it can be applied multiple times to the same customer. If set to `false`, the coupon can only be used once and is not reusable. If not specified, this field is set to `true` by default.
   * @example false
   */
  reusable?: boolean;
  /**
   * The percentage rate of the coupon. This field is required only for coupons with a `percentage` coupon type.
   * @pattern ^[0-9]+.?[0-9]*$
   * @example null
   */
  percentage_rate?: string | null;
  /**
   * The type of frequency for the coupon. It can have three possible values: `once`, `recurring` or `forever`.
   *
   * - If set to `once`, the coupon is applicable only for a single use.
   * - If set to `recurring`, the coupon can be used multiple times for recurring billing periods.
   * - If set to `forever`, the coupon has unlimited usage and can be applied indefinitely.
   * @example "recurring"
   */
  frequency?: 'once' | 'recurring';
  /**
   * Specifies the number of billing periods to which the coupon applies. This field is required only for coupons with a `recurring` frequency type
   * @example 6
   */
  frequency_duration?: number | null;
  /**
   * Specifies the type of expiration for the coupon. It can have two possible values: `time_limit` or `no_expiration`.
   *
   * - If set to `time_limit`, the coupon has an expiration based on a specified time limit.
   * - If set to `no_expiration`, the coupon does not have an expiration date and remains valid indefinitely.
   * @example "time_limit"
   */
  expiration?: 'no_expiration' | 'time_limit';
  /**
   * The expiration date and time of the coupon. This field is required only for coupons with `expiration` set to `time_limit`. The expiration date and time should be specified in UTC format according to the ISO 8601 datetime standard. It indicates the exact moment when the coupon will expire and is no longer valid.
   * @format date-time
   * @example "2022-08-08T23:59:59Z"
   */
  expiration_at?: string | null;
  /** Set coupon limitations to plans or specific metrics. */
  applies_to?: {
    /**
     * An array of plan codes to which the coupon is applicable. By specifying the plan codes in this field, you can restrict the coupon's usage to specific plans only.
     * @example ["startup_plan"]
     */
    plan_codes?: string[] | null;
    /**
     * An array of billable metric codes to which the coupon is applicable. By specifying the billable metric codes in this field, you can restrict the coupon's usage to specific metrics only.
     * @example []
     */
    billable_metric_codes?: string[] | null;
  };
}

export interface CouponCreateInput {
  coupon: CouponBaseInput;
}

export interface CouponObject {
  /**
   * Unique identifier of the coupon, created by Lago.
   * @format uuid
   * @example "1a901a90-1a90-1a90-1a90-1a901a901a90"
   */
  lago_id: string;
  /**
   * The name of the coupon.
   * @example "Startup Deal"
   */
  name: string;
  /**
   * Unique code used to identify the coupon.
   * @example "startup_deal"
   */
  code: string;
  /**
   * Description of the coupon.
   * @example "I am a coupon description"
   */
  description?: string | null;
  /**
   * The type of the coupon. It can have two possible values: `fixed_amount` or `percentage`.
   *
   * - If set to `fixed_amount`, the coupon represents a fixed amount discount.
   * - If set to `percentage`, the coupon represents a percentage-based discount.
   * @example "fixed_amount"
   */
  coupon_type: 'fixed_amount' | 'percentage';
  /**
   * The amount of the coupon in cents. This field is required only for coupon with `fixed_amount` type.
   * @example 5000
   */
  amount_cents?: number | null;
  /** The currency of the coupon. This field is required only for coupon with `fixed_amount` type. */
  amount_currency?: Currency;
  /**
   * Indicates whether the coupon can be reused or not. If set to `true`, the coupon is reusable, meaning it can be applied multiple times to the same customer. If set to `false`, the coupon can only be used once and is not reusable. If not specified, this field is set to `true` by default.
   * @example true
   */
  reusable: boolean;
  /**
   * The coupon is limited to specific plans. The possible values can be `true` or `false`.
   * @example true
   */
  limited_plans: boolean;
  /**
   * An array of plan codes to which the coupon is applicable. By specifying the plan codes in this field, you can restrict the coupon's usage to specific plans only.
   * @example ["startup_plan"]
   */
  plan_codes?: string[];
  /**
   * The coupon is limited to specific billable metrics. The possible values can be `true` or `false`.
   * @example false
   */
  limited_billable_metrics: boolean;
  /**
   * An array of billable metric codes to which the coupon is applicable. By specifying the billable metric codes in this field, you can restrict the coupon's usage to specific metrics only.
   * @example []
   */
  billable_metric_codes?: string[];
  /**
   * The percentage rate of the coupon. This field is required only for coupons with a `percentage` coupon type.
   * @pattern ^[0-9]+.?[0-9]*$
   * @example null
   */
  percentage_rate?: string | null;
  /**
   * The type of frequency for the coupon. It can have three possible values: `once`, `recurring`, or `forever`.
   *
   * - If set to `once`, the coupon is applicable only for a single use.
   * - If set to `recurring`, the coupon can be used multiple times for recurring billing periods.
   * - If set to `forever`, the coupon has unlimited usage and can be applied indefinitely.
   * @example "recurring"
   */
  frequency: 'once' | 'recurring';
  /**
   * Specifies the number of billing periods to which the coupon applies. This field is required only for coupons with a `recurring` frequency type
   * @example 6
   */
  frequency_duration?: number | null;
  /**
   * Specifies the type of expiration for the coupon. It can have two possible values: `time_limit` or `no_expiration`.
   *
   * - If set to `time_limit`, the coupon has an expiration based on a specified time limit.
   * - If set to `no_expiration`, the coupon does not have an expiration date and remains valid indefinitely.
   * @example "time_limit"
   */
  expiration: 'no_expiration' | 'time_limit';
  /**
   * The expiration date and time of the coupon. This field is required only for coupons with `expiration` set to `time_limit`. The expiration date and time should be specified in UTC format according to the ISO 8601 datetime standard. It indicates the exact moment when the coupon will expire and is no longer valid.
   * @format date-time
   * @example "2022-08-08T23:59:59Z"
   */
  expiration_at?: string | null;
  /**
   * The date and time when the coupon was created. It is expressed in UTC format according to the ISO 8601 datetime standard. This field provides the timestamp for the exact moment when the coupon was initially created.
   * @format date-time
   * @example "2022-04-29T08:59:51Z"
   */
  created_at: string;
}

export interface CouponsPaginated {
  coupons: CouponObject[];
  meta: PaginationMeta;
}

export interface CouponUpdateInput {
  coupon: CouponBaseInput;
}

export interface CreditObject {
  /**
   * Unique identifier assigned to the credit within the Lago application. This ID is exclusively created by Lago and serves as a unique identifier for the credit’s item record within the Lago system.
   * @format uuid
   * @example "1a901a90-1a90-1a90-1a90-1a901a901a90"
   */
  lago_id: string;
  /**
   * The amount of credit associated with the invoice, expressed in cents.
   * @example 1200
   */
  amount_cents: number;
  /** The currency of the credit. */
  amount_currency: Currency;
  /**
   * Indicates whether the credit is applied on the amount before taxes (coupons) or after taxes (credit notes). This flag helps determine the order in which credits are applied to the invoice calculation
   * @example false
   */
  before_taxes: boolean;
  /** The item attached to the credit. */
  item: {
    /**
     * Unique identifier assigned to the credit item within the Lago application.
     * @format uuid
     * @example "1a901a90-1a90-1a90-1a90-1a901a901a90"
     */
    lago_id: string;
    /**
     * The type of credit applied. Possible values are `coupon` or `credit_note`.
     * @example "coupon"
     */
    type: 'coupon' | 'credit_note';
    /**
     * The code of the credit applied. It can be the code of the coupon attached to the credit or the credit note's number.
     * @example "startup_deal"
     */
    code: string;
    /**
     * The name of the credit applied. It can be the name of the coupon attached to the credit or the initial invoice's number linked to the credit note.
     * @example "Startup Deal"
     */
    name: string;
  };
  invoice: {
    /**
     * @format uuid
     * @example "1a901a90-1a90-1a90-1a90-1a901a901a90"
     */
    lago_id: string;
    /** @example "succeeded" */
    payment_status: 'pending' | 'succeeded' | 'failed';
  };
}

export interface CreditNote {
  credit_note: CreditNoteObject;
}

export type CreditNoteAppliedTaxObject = BaseAppliedTax & {
  /**
   * Unique identifier of the credit note, created by Lago.
   * @format uuid
   * @example "1a901a90-1a90-1a90-1a90-1a901a901a90"
   */
  lago_credit_note_id?: string;
  /** @example 100 */
  base_amount_cents?: number;
};

export interface CreditNoteItemObject {
  /**
   * The credit note’s item unique identifier, created by Lago.
   * @format uuid
   * @example "1a901a90-1a90-1a90-1a90-1a901a901a90"
   */
  lago_id: string;
  /**
   * The credit note’s item amount, expressed in cents.
   * @example 100
   */
  amount_cents: number;
  /** The credit note’s item currency. */
  amount_currency: Currency;
  /** The fee object related to the credit note item. */
  fee: FeeObject;
}

export interface CreditNoteObject {
  /**
   * The credit note unique identifier, created by Lago.
   * @format uuid
   * @example "1a901a90-1a90-1a90-1a90-1a901a901a90"
   */
  lago_id: string;
  /**
   * The sequential identifier of the credit note, specifically scoped on the associated invoice. It provides a unique numerical identifier for the credit note within the context of the invoice.
   * @example 2
   */
  sequential_id: number;
  /**
   * The credit note unique number.
   * @example "LAG-1234-CN2"
   */
  number: string;
  /**
   * Unique identifier assigned to the invoice that the credit note belongs to
   * @format uuid
   * @example "1a901a90-1a90-1a90-1a90-1a901a901a90"
   */
  lago_invoice_id: string;
  /**
   * The invoice unique number, related to the credit note.
   * @example "LAG-1234"
   */
  invoice_number: string;
  /**
   * The date of creation of the credit note. It follows the ISO 8601 date format and provides the specific date when the credit note was created.
   * @format date
   * @example "2022-12-06"
   */
  issuing_date: string;
  /**
   * The status of the credit portion of the credit note. It indicates the current state or condition of the credit amount associated with the credit note. The possible values for this field are:
   *
   * - `available`: this status indicates that an amount remains available for future usage. The credit can be applied towards future transactions or invoices.
   * - `consumed`: this status indicates that the credit amount has been fully consumed. The remaining amount is 0, indicating that the credit has been utilized in its entirety.
   * - `voided`: this status indicates that the remaining amount of the credit cannot be used any further. The credit has been voided and is no longer available for application or redemption.
   * @example "available"
   */
  credit_status?: 'available' | 'consumed' | 'voided' | null;
  /**
   * The status of the refund portion of the credit note. It indicates the current state or condition of the refund associated with the credit note. The possible values for this field are:
   *
   * - `pending`: this status indicates that the refund is pending execution. The refund request has been initiated but has not been processed or completed yet.
   * - `succeeded`: this status indicates that the refund has been successfully executed. The refund amount has been processed and returned to the customer or the designated recipient.
   * - `failed`: this status indicates that the refund failed to execute. The refund request encountered an error or unsuccessful processing, and the refund amount could not be returned.
   * @example "pending"
   */
  refund_status?: 'pending' | 'succeeded' | 'failed' | null;
  /**
   * The reason of the credit note creation.
   * Possible values are `duplicated_charge`, `product_unsatisfactory`, `order_change`, `order_cancellation`, `fraudulent_charge` or `other`.
   * @example "other"
   */
  reason:
    | 'duplicated_charge'
    | 'product_unsatisfactory'
    | 'order_change'
    | 'order_cancellation'
    | 'fraudulent_charge'
    | 'other';
  /**
   * The description of the credit note.
   * @example "Free text"
   */
  description?: string | null;
  /** The currency of the credit note. */
  currency: Currency;
  /**
   * The total amount of the credit note, expressed in cents.
   * @example 120
   */
  total_amount_cents: number;
  /**
   * The tax amount of the credit note, expressed in cents.
   * @example 20
   */
  taxes_amount_cents: number;
  /**
   * The tax rate associated with this specific credit note.
   * @example 20
   */
  taxes_rate: number;
  /**
   * The subtotal of the credit note excluding any applicable taxes, expressed in cents.
   * @example 100
   */
  sub_total_excluding_taxes_amount_cents: number;
  /**
   * The remaining credit note amount, expressed in cents.
   * @example 100
   */
  balance_amount_cents: number;
  /**
   * The credited amount of the credit note, expressed in cents.
   * @example 100
   */
  credit_amount_cents: number;
  /**
   * The refunded amount of the credit note, expressed in cents.
   * @example 0
   */
  refund_amount_cents: number;
  /**
   * The pro-rated amount of the coupons applied to the source invoice.
   * @example 20
   */
  coupons_adjustement_amount_cents: number;
  /**
   * The date when the credit note was created. It is expressed in Coordinated Universal Time (UTC).
   * @format date-time
   * @example "2022-09-14T16:35:31Z"
   */
  created_at: string;
  /**
   * The date when the credit note was last updated. It is expressed in Coordinated Universal Time (UTC).
   * @format date-time
   * @example "2022-09-14T16:35:31Z"
   */
  updated_at: string;
  /**
   * The PDF file of the credit note.
   * @example "https://getlago.com/credit_note/file"
   */
  file_url?: string | null;
  /** Array of credit note’s items. */
  items?: CreditNoteItemObject[];
  applied_taxes?: CreditNoteAppliedTaxObject[];
}

export interface CreditNotes {
  credit_notes: CreditNoteObject[];
}

export interface CreditNoteCreateInput {
  credit_note: {
    /**
     * The invoice unique identifier, created by Lago.
     * @format uuid
     * @example "1a901a90-1a90-1a90-1a90-1a901a901a90"
     */
    invoice_id: string;
    /**
     * The reason of the credit note creation.
     * Possible values are `duplicated_charge`, `product_unsatisfactory`, `order_change`, `order_cancellation`, `fraudulent_charge` or `other`.
     * @example "duplicated_charge"
     */
    reason?:
      | 'duplicated_charge'
      | 'product_unsatisfactory'
      | 'order_change'
      | 'order_cancellation'
      | 'fraudulent_charge'
      | 'other'
      | null;
    /**
     * The description of the credit note.
     * @example "description"
     */
    description?: string;
    /**
     * The total amount to be credited on the customer balance.
     * @example 10
     */
    credit_amount_cents?: number | null;
    /**
     * The total amount to be refunded to the customer.
     * @example 5
     */
    refund_amount_cents?: number | null;
    /**
     * The list of credit note’s items.
     * @example [{"fee_id":"1a901a90-1a90-1a90-1a90-1a901a901a90","amount_cents":10},{"fee_id":"1a901a90-1a90-1a90-1a90-1a901a901a91","amount_cents":5}]
     */
    items: {
      /**
       * The fee unique identifier, created by Lago.
       * @format uuid
       * @example "1a901a90-1a90-1a90-1a90-1a901a901a90"
       */
      fee_id: string;
      /**
       * The amount of the credit note item, expressed in cents.
       * @example 10
       */
      amount_cents: number;
    }[];
  };
}

export interface CreditNoteUpdateInput {
  credit_note: {
    /**
     * The status of the refund portion of the credit note. It indicates the current state or condition of the refund associated with the credit note. The possible values for this field are:
     *
     * - `pending`: this status indicates that the refund is pending execution. The refund request has been initiated but has not been processed or completed yet.
     * - `succeeded`: this status indicates that the refund has been successfully executed. The refund amount has been processed and returned to the customer or the designated recipient.
     * - `failed`: this status indicates that the refund failed to execute. The refund request encountered an error or unsuccessful processing, and the refund amount could not be returned.
     * @example "succeeded"
     */
    refund_status: 'pending' | 'succeeded' | 'failed';
  };
}

/** @example "USD" */
export enum Currency {
  AED = 'AED',
  AFN = 'AFN',
  ALL = 'ALL',
  AMD = 'AMD',
  ANG = 'ANG',
  AOA = 'AOA',
  ARS = 'ARS',
  AUD = 'AUD',
  AWG = 'AWG',
  AZN = 'AZN',
  BAM = 'BAM',
  BBD = 'BBD',
  BDT = 'BDT',
  BGN = 'BGN',
  BIF = 'BIF',
  BMD = 'BMD',
  BND = 'BND',
  BOB = 'BOB',
  BRL = 'BRL',
  BSD = 'BSD',
  BWP = 'BWP',
  BYN = 'BYN',
  BZD = 'BZD',
  CAD = 'CAD',
  CDF = 'CDF',
  CHF = 'CHF',
  CLF = 'CLF',
  CLP = 'CLP',
  CNY = 'CNY',
  COP = 'COP',
  CRC = 'CRC',
  CVE = 'CVE',
  CZK = 'CZK',
  DJF = 'DJF',
  DKK = 'DKK',
  DOP = 'DOP',
  DZD = 'DZD',
  EGP = 'EGP',
  ETB = 'ETB',
  EUR = 'EUR',
  FJD = 'FJD',
  FKP = 'FKP',
  GBP = 'GBP',
  GEL = 'GEL',
  GIP = 'GIP',
  GMD = 'GMD',
  GNF = 'GNF',
  GTQ = 'GTQ',
  GYD = 'GYD',
  HKD = 'HKD',
  HNL = 'HNL',
  HRK = 'HRK',
  HTG = 'HTG',
  HUF = 'HUF',
  IDR = 'IDR',
  ILS = 'ILS',
  INR = 'INR',
  ISK = 'ISK',
  JMD = 'JMD',
  JPY = 'JPY',
  KES = 'KES',
  KGS = 'KGS',
  KHR = 'KHR',
  KMF = 'KMF',
  KRW = 'KRW',
  KYD = 'KYD',
  KZT = 'KZT',
  LAK = 'LAK',
  LBP = 'LBP',
  LKR = 'LKR',
  LRD = 'LRD',
  LSL = 'LSL',
  MAD = 'MAD',
  MDL = 'MDL',
  MGA = 'MGA',
  MKD = 'MKD',
  MMK = 'MMK',
  MNT = 'MNT',
  MOP = 'MOP',
  MRO = 'MRO',
  MUR = 'MUR',
  MVR = 'MVR',
  MWK = 'MWK',
  MXN = 'MXN',
  MYR = 'MYR',
  MZN = 'MZN',
  NAD = 'NAD',
  NGN = 'NGN',
  NIO = 'NIO',
  NOK = 'NOK',
  NPR = 'NPR',
  NZD = 'NZD',
  PAB = 'PAB',
  PEN = 'PEN',
  PGK = 'PGK',
  PHP = 'PHP',
  PKR = 'PKR',
  PLN = 'PLN',
  PYG = 'PYG',
  QAR = 'QAR',
  RON = 'RON',
  RSD = 'RSD',
  RUB = 'RUB',
  RWF = 'RWF',
  SAR = 'SAR',
  SBD = 'SBD',
  SCR = 'SCR',
  SEK = 'SEK',
  SGD = 'SGD',
  SHP = 'SHP',
  SLL = 'SLL',
  SOS = 'SOS',
  SRD = 'SRD',
  STD = 'STD',
  SZL = 'SZL',
  THB = 'THB',
  TJS = 'TJS',
  TOP = 'TOP',
  TRY = 'TRY',
  TTD = 'TTD',
  TWD = 'TWD',
  TZS = 'TZS',
  UAH = 'UAH',
  UGX = 'UGX',
  USD = 'USD',
  UYU = 'UYU',
  UZS = 'UZS',
  VND = 'VND',
  VUV = 'VUV',
  WST = 'WST',
  XAF = 'XAF',
  XCD = 'XCD',
  XOF = 'XOF',
  XPF = 'XPF',
  YER = 'YER',
  ZAR = 'ZAR',
  ZMW = 'ZMW',
}

export interface Customer {
  customer: CustomerObjectExtended;
}

/** Configuration specific to the payment provider, utilized for billing the customer. This object contains settings and parameters necessary for processing payments and invoicing the customer. */
export interface CustomerBillingConfiguration {
  /**
   * The grace period, expressed in days, for the invoice. This period refers to the additional time granted to the customer beyond the invoice due date to adjust usage and line items
   * @example 3
   */
  invoice_grace_period?: number;
  /**
   * The payment provider utilized to initiate payments for invoices issued by Lago.
   * Accepted values: `stripe`, `adyen`, `gocardless` or null. This field is required if you intend to assign a `provider_customer_id`.
   * @example "stripe"
   */
  payment_provider?: 'stripe' | 'adyen' | 'gocardless';
  /**
   * The customer ID within the payment provider's system. If this field is not provided, Lago has the option to create a new customer record within the payment provider's system on behalf of the customer
   * @example "cus_12345"
   */
  provider_customer_id?: string;
  /**
   * Set this field to `true` if you want to create the customer in the payment provider synchronously with the customer creation process in Lago. This option is applicable only when the `provider_customer_id` is `null` and the customer is automatically created in the payment provider through Lago. By default, the value is set to `false`
   * @example true
   */
  sync?: boolean;
  /**
   * Set this field to `true` if you want to create a customer record in the payment provider's system. This option is applicable only when the `provider_customer_id` is null and the `sync_with_provider` field is set to `true`. By default, the value is set to `false`
   * @example true
   */
  sync_with_provider?: boolean;
  /**
   * The document locale, specified in the ISO 639-1 format. This field represents the language or locale used for the documents issued by Lago
   * @example "fr"
   */
  document_locale?: string;
  /**
   * Specifies the available payment methods that can be used for this customer when `payment_provider` is set to `stripe`. The `provider_payment_methods` field is an array that allows multiple payment options to be defined. If this field is not explicitly set, all the payment methods are selected. For now, possible values are `card` and `sepa_debit`.
   * @example ["card","sepa_debit"]
   */
  provider_payment_methods?: string[] | null;
}

export interface CustomerChargeUsageObject {
  /**
   * The number of units consumed by the customer for a specific charge item.
   * @pattern ^[0-9]+.?[0-9]*$
   * @example "1.0"
   */
  units: string;
  /**
   * The amount in cents, tax excluded, consumed by the customer for a specific charge item.
   * @example 123
   */
  amount_cents: number;
  /** The currency of a usage item consumed by the customer. */
  amount_currency: Currency;
  /** Object listing all the properties for a specific charge item. */
  charge: {
    /**
     * Unique identifier assigned to the charge within the Lago application. This ID is exclusively created by Lago and serves as a unique identifier for the charge’s record within the Lago system.
     * @format uuid
     * @example "1a901a90-1a90-1a90-1a90-1a901a901a90"
     */
    lago_id: string;
    /**
     * The pricing model applied to this charge. Possible values are standard, `graduated`, `percentage`, `package` or `volume`.
     * @example "graduated"
     */
    charge_model: 'standard' | 'graduated' | 'package' | 'percentage' | 'volume';
  };
  /** The related billable metric object. */
  billable_metric: {
    /**
     * Unique identifier assigned to the billable metric within the Lago application. This ID is exclusively created by Lago and serves as a unique identifier for the billable metric’s record within the Lago system.
     * @format uuid
     * @example "1a901a90-1a90-1a90-1a90-1a901a901a90"
     */
    lago_id: string;
    /**
     * The name of the billable metric used for this charge.
     * @example "Storage"
     */
    name: string;
    /**
     * The code of the billable metric used for this charge.
     * @example "storage"
     */
    code: string;
    /**
     * The aggregation type of the billable metric used for this charge. Possible values are `count_agg`, `sum_agg`, `max_agg` or `unique_count_agg`.
     * @example "sum_agg"
     */
    aggregation_type: 'count_agg' | 'sum_agg' | 'max_agg' | 'unique_count_agg';
  };
  /** Array of group object, representing multiple dimensions for a charge item. */
  groups: {
    /**
     * Unique identifier assigned to the group within the Lago application. This ID is exclusively created by Lago and serves as a unique identifier for the group record within the Lago system.
     * @format uuid
     * @example "1a901a90-1a90-1a90-1a90-1a901a901a90"
     */
    lago_id?: string;
    /**
     * The group key, only returned for groups with two dimensions.
     * @example null
     */
    key?: string | null;
    /**
     * The group value.
     * @example "europe"
     */
    value?: string;
    /**
     * The number of units consumed for a specific group related to a charge item.
     * @pattern ^[0-9]+.?[0-9]*$
     * @example "0.9"
     */
    units?: string;
    /**
     * The amount in cents, tax excluded, consumed for a specific group related to a charge item.
     * @example 1000
     */
    amount_cents?: number;
  }[];
}

export interface CustomerCreateInput {
  customer: {
    /**
     * The customer external unique identifier (provided by your own application)
     * @example "5eb02857-a71e-4ea2-bcf9-57d3a41bc6ba"
     */
    external_id: string;
    /**
     * The first line of the billing address
     * @example "5230 Penfield Ave"
     */
    address_line1?: string | null;
    /**
     * The second line of the billing address
     * @example ""
     */
    address_line2?: string | null;
    /**
     * The city of the customer's billing address
     * @example "Woodland Hills"
     */
    city?: string | null;
    /** Country code of the customer's billing address. Format must be ISO 3166 (alpha-2) */
    country?: Country;
    /** Currency of the customer. Format must be ISO 4217 */
    currency?: Currency;
    /**
     * The email of the customer
     * @format email
     * @example "dinesh@piedpiper.test"
     */
    email?: string | null;
    /**
     * The legal company name of the customer
     * @example "Coleman-Blair"
     */
    legal_name?: string | null;
    /**
     * The legal company number of the customer
     * @example "49-008-2965"
     */
    legal_number?: string | null;
    /**
     * The logo URL of the customer
     * @example "http://hooli.com/logo.png"
     */
    logo_url?: string | null;
    /**
     * The full name of the customer
     * @example "Gavin Belson"
     */
    name?: string | null;
    /**
     * The phone number of the customer
     * @example "1-171-883-3711 x245"
     */
    phone?: string | null;
    /**
     * The state of the customer's billing address
     * @example "CA"
     */
    state?: string | null;
    /**
     * List of unique code used to identify the taxes.
     * @example ["french_standard_vat"]
     */
    tax_codes?: string[];
    /**
     * The tax identification number of the customer
     * @example "EU123456789"
     */
    tax_identification_number?: string | null;
    /** The customer's timezone, used for billing purposes in their local time. Overrides the organization's timezone */
    timezone?: Timezone;
    /**
     * The custom website URL of the customer
     * @example "http://hooli.com"
     */
    url?: string | null;
    /**
     * The zipcode of the customer's billing address
     * @example "91364"
     */
    zipcode?: string | null;
    /**
     * The net payment term, expressed in days, specifies the duration within which a customer is expected to remit payment after the invoice is finalized.
     * @example 30
     */
    net_payment_term?: number | null;
    /** Configuration specific to the payment provider, utilized for billing the customer. This object contains settings and parameters necessary for processing payments and invoicing the customer. */
    billing_configuration?: CustomerBillingConfiguration;
    /** Set of key-value pairs that you can attach to a customer. This can be useful for storing additional information about the customer in a structured format */
    metadata?: {
      /**
       * Identifier for the metadata object, only required when updating a key-value pair
       * @format uuid
       * @example "1a901a90-1a90-1a90-1a90-1a901a901a90"
       */
      id?: string;
      /**
       * The metadata object key
       * @example "Purchase Order"
       */
      key: string;
      /**
       * The metadata object value
       * @example "123456789"
       */
      value: string;
      /**
       * Determines whether the item or information should be displayed in the invoice. If set to true, the item or information will be included and visible in the generated invoice. If set to false, the item or information will be excluded and not displayed in the invoice.
       * @example true
       */
      display_in_invoice: boolean;
    }[];
  };
}

/** Set of key-value pairs that you can attach to a customer. This can be useful for storing additional information about the customer in a structured format */
export interface CustomerMetadata {
  /**
   * A unique identifier for the customer metadata object in the Lago application. Can be used to update a key-value pair
   * @format uuid
   * @example "1a901a90-1a90-1a90-1a90-1a901a901a90"
   */
  lago_id: string;
  /**
   * The metadata object key
   * @example "Purchase Order"
   */
  key: string;
  /**
   * The metadata object value
   * @example "123456789"
   */
  value: string;
  /**
   * Determines whether the item or information should be displayed in the invoice. If set to true, the item or information will be included and visible in the generated invoice. If set to false, the item or information will be excluded and not displayed in the invoice.
   * @example true
   */
  display_in_invoice: boolean;
  /**
   * The date of the metadata object creation, represented in ISO 8601 datetime format and expressed in Coordinated Universal Time (UTC). The creation_date provides a standardized and internationally recognized timestamp for when the metadata object was created
   * @format date-time
   * @example "2022-04-29T08:59:51Z"
   */
  created_at: string;
}

export interface CustomerObject {
  /**
   * Unique identifier assigned to the customer within the Lago application. This ID is exclusively created by Lago and serves as a unique identifier for the customer's record within the Lago system
   * @format uuid
   * @example "1a901a90-1a90-1a90-1a90-1a901a901a90"
   */
  lago_id: string;
  /**
   * The unique identifier assigned to the customer within the organization's scope. This identifier is used to track and reference the customer's order of creation within the organization's system. It ensures that each customer has a distinct `sequential_id`` associated with them, allowing for easy identification and sorting based on the order of creation
   * @example 1
   */
  sequential_id: number;
  /**
   * A concise and unique identifier for the customer, formed by combining the Organization's `name`, `id`, and customer's `sequential_id`
   * @example "LAG-1234-001"
   */
  slug: string;
  /**
   * The customer external unique identifier (provided by your own application)
   * @example "5eb02857-a71e-4ea2-bcf9-57d3a41bc6ba"
   */
  external_id: string;
  /**
   * The first line of the billing address
   * @example "5230 Penfield Ave"
   */
  address_line1?: string | null;
  /**
   * The second line of the billing address
   * @example null
   */
  address_line2?: string | null;
  /** The customer's applicable timezone, used for billing purposes in their local time. */
  applicable_timezone: Timezone;
  /**
   * The city of the customer's billing address
   * @example "Woodland Hills"
   */
  city?: string | null;
  /** Country code of the customer's billing address. Format must be ISO 3166 (alpha-2) */
  country?: Country;
  /** Currency of the customer. Format must be ISO 4217 */
  currency?: Currency;
  /**
   * The email of the customer
   * @format email
   * @example "dinesh@piedpiper.test"
   */
  email?: string | null;
  /**
   * The legal company name of the customer
   * @example "Coleman-Blair"
   */
  legal_name?: string | null;
  /**
   * The legal company number of the customer
   * @example "49-008-2965"
   */
  legal_number?: string | null;
  /**
   * The logo URL of the customer
   * @example "http://hooli.com/logo.png"
   */
  logo_url?: string | null;
  /**
   * The full name of the customer
   * @example "Gavin Belson"
   */
  name?: string | null;
  /**
   * The phone number of the customer
   * @example "1-171-883-3711 x245"
   */
  phone?: string | null;
  /**
   * The state of the customer's billing address
   * @example "CA"
   */
  state?: string | null;
  /**
   * The tax identification number of the customer
   * @example "EU123456789"
   */
  tax_identification_number?: string | null;
  /** The customer's timezone, used for billing purposes in their local time. Overrides the organization's timezone */
  timezone?: Timezone;
  /**
   * The custom website URL of the customer
   * @example "http://hooli.com"
   */
  url?: string | null;
  /**
   * The zipcode of the customer's billing address
   * @example "91364"
   */
  zipcode?: string | null;
  /**
   * The net payment term, expressed in days, specifies the duration within which a customer is expected to remit payment after the invoice is finalized.
   * @example 30
   */
  net_payment_term?: number | null;
  /**
   * The date of the customer creation, represented in ISO 8601 datetime format and expressed in Coordinated Universal Time (UTC). The creation_date provides a standardized and internationally recognized timestamp for when the customer object was created
   * @format date-time
   * @example "2022-04-29T08:59:51Z"
   */
  created_at: string;
  /**
   * The date of the customer update, represented in ISO 8601 datetime format and expressed in Coordinated Universal Time (UTC). The update_date provides a standardized and internationally recognized timestamp for when the customer object was updated
   * @format date-time
   * @example "2022-04-29T08:59:51Z"
   */
  updated_at?: string;
  /** Configuration specific to the payment provider, utilized for billing the customer. This object contains settings and parameters necessary for processing payments and invoicing the customer. */
  billing_configuration?: CustomerBillingConfiguration;
  metadata?: CustomerMetadata[];
}

export type CustomerObjectExtended = CustomerObject & {
  metadata?: CustomerMetadata[];
  /** List of customer taxes */
  taxes?: TaxObject[];
};

export interface CustomersPaginated {
  customers: CustomerObjectExtended[];
  meta: PaginationMeta;
}

export interface CustomerUsage {
  customer_usage: CustomerUsageObject;
}

export interface CustomerUsageObject {
  /**
   * The lower bound of the billing period, expressed in the ISO 8601 datetime format in Coordinated Universal Time (UTC).
   * @format date-time
   * @example "2022-07-01T00:00:00Z"
   */
  from_datetime: string;
  /**
   * The upper bound of the billing period, expressed in the ISO 8601 datetime format in Coordinated Universal Time (UTC).
   * @format date-time
   * @example "2022-07-31T23:59:59Z"
   */
  to_datetime: string;
  /**
   * The date of creation of the invoice.
   * @format date-time
   * @example "2022-08-01T23:59:59Z"
   */
  issuing_date: string;
  /** The currency of the customer’s current usage. */
  currency?: Currency;
  /**
   * The amount in cents, tax excluded.
   * @example 123
   */
  amount_cents: number;
  /**
   * The tax amount in cents.
   * @example 200
   */
  taxes_amount_cents: number;
  /**
   * The total amount in cents, tax included.
   * @example 123
   */
  total_amount_cents: number;
  /** Array of charges that comprise the current usage. It contains detailed information about individual charge items associated with the usage. */
  charges_usage: CustomerChargeUsageObject[];
}

export interface Event {
  event: EventObject;
}

export interface EventBatchInput {
  event: {
    /**
     * This field represents a unique identifier for the event. It is crucial for ensuring idempotency, meaning that each event can be uniquely identified and processed without causing any unintended side effects.
     * @example "transaction_1234567890"
     */
    transaction_id: string;
    /**
     * The customer external unique identifier (provided by your own application). This field is optional if you send the `external_subscription_ids`, targeting a specific subscription.
     * @example "5eb02857-a71e-4ea2-bcf9-57d3a41bc6ba"
     */
    external_customer_id?: string;
    /**
     * Array of unique identifiers of the targeted subscriptions within your application.
     * @example ["sub_1234567890","sub_0987654321"]
     */
    external_subscription_ids: string[];
    /**
     * The code that identifies a targeted billable metric. It is essential that this code matches the `code` property of one of your active billable metrics. If the provided code does not correspond to any active billable metric, it will be ignored during the process.
     * @example "storage"
     */
    code: string;
    /**
     * This field captures the Unix timestamp in seconds indicating the occurrence of the event in Coordinated Universal Time (UTC). If this timestamp is not provided, the API will automatically set it to the time of event reception.
     * @example 1651240791
     */
    timestamp?: number;
    /**
     * This field represents additional properties associated with the event, which are utilized in the calculation of the final fee. This object becomes mandatory when the targeted billable metric employs a `sum_agg`, `max_agg`, or `unique_count_agg` aggregation method. However, when using a simple `count_agg`, this object is not required.
     * @example {"gb":10}
     */
    properties?: {
      /** The `operation_type` field is only necessary when adding or removing a specific unit when the targeted billable metric adopts a `unique_count_agg` aggregation method. In other cases, the `operation_type` field is not required. The valid values for the `operation_type` field are `add` or `remove`, which indicate whether the unit is being added or removed from the unique count aggregation, respectively. */
      operation_type?: 'add' | 'remove';
      [key: string]: any;
    };
  };
}

export interface EventEstimateFeesInput {
  event: {
    /**
     * The code that identifies a targeted billable metric. It is essential that this code matches the `code` property of one of your active billable metrics. If the provided code does not correspond to any active billable metric, it will be ignored during the process.
     * @example "storage"
     */
    code: string;
    /**
     * The customer external unique identifier (provided by your own application). This field is optional if you send the `external_subscription_id`, targeting a specific subscription.
     * @example "5eb02857-a71e-4ea2-bcf9-57d3a41bc6ba"
     */
    external_customer_id?: string;
    /**
     * The unique identifier of the subscription within your application. It is a mandatory field when the customer possesses multiple subscriptions or when the `external_customer_id` is not provided.
     * @example "sub_1234567890"
     */
    external_subscription_id?: string;
    /** This field represents additional properties associated with the event, which are utilized in the calculation of the final fee. This object becomes mandatory when the targeted billable metric employs a `sum_agg`, `max_agg`, or `unique_count_agg` aggregation method. However, when using a simple `count_agg`, this object is not required. */
    properties?: object;
  };
}

export interface EventInput {
  event: {
    /**
     * This field represents a unique identifier for the event. It is crucial for ensuring idempotency, meaning that each event can be uniquely identified and processed without causing any unintended side effects.
     * @example "transaction_1234567890"
     */
    transaction_id: string;
    /**
     * The customer external unique identifier (provided by your own application). This field is optional if you send the `external_subscription_id`, targeting a specific subscription.
     * @example "5eb02857-a71e-4ea2-bcf9-57d3a41bc6ba"
     */
    external_customer_id?: string;
    /**
     * The unique identifier of the subscription within your application. It is a mandatory field when the customer possesses multiple subscriptions or when the `external_customer_id` is not provided.
     * @example "sub_1234567890"
     */
    external_subscription_id?: string;
    /**
     * The code that identifies a targeted billable metric. It is essential that this code matches the `code` property of one of your active billable metrics. If the provided code does not correspond to any active billable metric, it will be ignored during the process.
     * @example "storage"
     */
    code: string;
    /**
     * This field captures the Unix timestamp in seconds indicating the occurrence of the event in Coordinated Universal Time (UTC). If this timestamp is not provided, the API will automatically set it to the time of event reception.
     * @example 1651240791
     */
    timestamp?: number;
    /**
     * This field represents additional properties associated with the event, which are utilized in the calculation of the final fee. This object becomes mandatory when the targeted billable metric employs a `sum_agg`, `max_agg`, or `unique_count_agg` aggregation method. However, when using a simple `count_agg`, this object is not required.
     * @example {"gb":10}
     */
    properties?: Record<string, string|number>;
  };
}

export interface EventObject {
  /**
   * Unique identifier assigned to the event within the Lago application. This ID is exclusively created by Lago and serves as a unique identifier for the event's record within the Lago system
   * @format uuid
   * @example "1a901a90-1a90-1a90-1a90-1a901a901a90"
   */
  lago_id: string;
  /**
   * This field represents a unique identifier for the event. It is crucial for ensuring idempotency, meaning that each event can be uniquely identified and processed without causing any unintended side effects.
   * @example "transaction_1234567890"
   */
  transaction_id: string;
  /**
   * Unique identifier assigned to the customer within the Lago application. This ID is exclusively created by Lago and serves as a unique identifier for the customer's record within the Lago system
   * @format uuid
   * @example "1a901a90-1a90-1a90-1a90-1a901a901a90"
   */
  lago_customer_id: string;
  /**
   * The customer external unique identifier (provided by your own application). This field is optional if you send the `external_subscription_id`, targeting a specific subscription.
   * @example "5eb02857-a71e-4ea2-bcf9-57d3a41bc6ba"
   */
  external_customer_id: string;
  /**
   * The code that identifies a targeted billable metric. It is essential that this code matches the `code` property of one of your active billable metrics. If the provided code does not correspond to any active billable metric, it will be ignored during the process.
   * @example "storage"
   */
  code: string;
  /**
   * This field captures the Unix timestamp in seconds indicating the occurrence of the event in Coordinated Universal Time (UTC). If this timestamp is not provided, the API will automatically set it to the time of event reception.
   * @format date-time
   * @example "2022-04-29T08:59:51Z"
   */
  timestamp: string;
  /**
   * This field represents additional properties associated with the event, which are utilized in the calculation of the final fee. This object becomes mandatory when the targeted billable metric employs a `sum_agg`, `max_agg`, or `unique_count_agg` aggregation method. However, when using a simple `count_agg`, this object is not required.
   * @example {"gb":10}
   */
  properties?: {
    /** The `operation_type` field is only necessary when adding or removing a specific unit when the targeted billable metric adopts a `unique_count_agg` aggregation method. In other cases, the `operation_type` field is not required. The valid values for the `operation_type` field are `add` or `remove`, which indicate whether the unit is being added or removed from the unique count aggregation, respectively. */
    operation_type?: 'add' | 'remove';
    [key: string]: any;
  };
  /**
   * Unique identifier assigned to the subscription within the Lago application. This ID is exclusively created by Lago and serves as a unique identifier for the subscription’s record within the Lago system
   * @format uuid
   * @example "1a901a90-1a90-1a90-1a90-1a901a901a90"
   */
  lago_subscription_id: string;
  /**
   * The unique identifier of the subscription within your application. It is a mandatory field when the customer possesses multiple subscriptions or when the `external_customer_id` is not provided.
   * @example "sub_1234567890"
   */
  external_subscription_id: string;
  /**
   * The creation date of the event's record in the Lago application, presented in the ISO 8601 datetime format, specifically in Coordinated Universal Time (UTC). It provides the precise timestamp of when the event's record was created within the Lago application
   * @format date-time
   * @example "2022-04-29T08:59:51Z"
   */
  created_at: string;
}

export interface Fee {
  fee: FeeObject;
}

export type FeeAppliedTaxObject = BaseAppliedTax & {
  /**
   * Unique identifier of the fee, created by Lago.
   * @format uuid
   * @example "1a901a90-1a90-1a90-1a90-1a901a901a90"
   */
  lago_fee_id?: string;
};

export interface FeeObject {
  /**
   * Unique identifier assigned to the fee within the Lago application. This ID is exclusively created by Lago and serves as a unique identifier for the fee’s record within the Lago system.
   * @format uuid
   * @example "1a901a90-1a90-1a90-1a90-1a901a901a90"
   */
  lago_id?: string | null;
  /**
   * Unique identifier assigned to the group that the fee belongs to
   * @format uuid
   * @example "1a901a90-1a90-1a90-1a90-1a901a901a90"
   */
  lago_group_id?: string | null;
  /**
   * Unique identifier assigned to the invoice that the fee belongs to
   * @format uuid
   * @example "1a901a90-1a90-1a90-1a90-1a901a901a90"
   */
  lago_invoice_id?: string | null;
  /**
   * Unique identifier assigned to the true-up fee when a minimum has been set to the charge. This identifier helps to distinguish and manage the true-up fee associated with the charge, which may be applicable when a minimum threshold or limit is set for the charge amount.
   * @format uuid
   * @example "1a901a90-1a90-1a90-1a90-1a901a901a90"
   */
  lago_true_up_fee_id?: string | null;
  /**
   * Unique identifier assigned to the parent fee on which the true-up fee is assigned. This identifier establishes the relationship between the parent fee and the associated true-up fee.
   * @format uuid
   * @example "1a901a90-1a90-1a90-1a90-1a901a901a90"
   */
  lago_true_up_parent_fee_id?: string | null;
  /**
   * Unique identifier assigned to the subscription, created by Lago. This field is specifically displayed when the fee type is charge and the payment for the fee is made in advance (`pay_in_advance` is set to true).
   * @format uuid
   * @example "1a901a90-1a90-1a90-1a90-1a901a901a90"
   */
  lago_subscription_id?: string | null;
  /**
   * Unique identifier assigned to the customer, created by Lago. This field is specifically displayed when the fee type is charge and the payment for the fee is made in advance (`pay_in_advance` is set to true).
   * @format uuid
   * @example "1a901a90-1a90-1a90-1a90-1a901a901a90"
   */
  lago_customer_id?: string | null;
  /**
   * Unique identifier assigned to the customer in your application. This field is specifically displayed when the fee type is charge and the payment for the fee is made in advance (`pay_in_advance` is set to true).
   * @example "external_id"
   */
  external_customer_id?: string | null;
  /**
   * Unique identifier assigned to the subscription in your application. This field is specifically displayed when the fee type is charge and the payment for the fee is made in advance (`pay_in_advance` is set to true).
   * @example "external_id"
   */
  external_subscription_id?: string | null;
  /**
   * The cost of this specific fee, excluding any applicable taxes.
   * @example 100
   */
  amount_cents: number;
  /** The currency of this specific fee. It indicates the monetary unit in which the fee’s cost is expressed. */
  amount_currency: Currency;
  /**
   * The cost of the tax associated with this specific fee.
   * @example 20
   */
  taxes_amount_cents: number;
  /**
   * The tax rate associated with this specific fee.
   * @example 20
   */
  taxes_rate: number;
  /**
   * The number of units used to charge the customer. This field indicates the quantity or count of units consumed or utilized in the context of the charge. It helps in determining the basis for calculating the fee or cost associated with the usage of the service or product provided to the customer.
   * @example "0.32"
   */
  units: string;
  /**
   * The cost of this specific fee, including any applicable taxes.
   * @example 120
   */
  total_amount_cents: number;
  /** The currency of this specific fee, including any applicable taxes. */
  total_amount_currency: Currency;
  /**
   * The number of events that have been sent and used to charge the customer. This field indicates the count or quantity of events that have been processed and considered in the charging process.
   * @example 23
   */
  events_count?: number;
  /**
   * Flag that indicates whether the fee was paid in advance. It serves as a boolean value, where `true` represents that the fee was paid in advance (straightaway), and `false` indicates that the fee was not paid in arrears (at the end of the period).
   * @example true
   */
  pay_in_advance: boolean;
  /**
   * Flag that indicates whether the fee was included on the invoice. It serves as a boolean value, where `true` represents that the fee was included on the invoice, and `false` indicates that the fee was not included on the invoice.
   * @example true
   */
  invoiceable: boolean;
  /**
   * The beginning date of the period that the fee covers. It is applicable only to `subscription` and `charge` fees. This field indicates the start date of the billing period or subscription period associated with the fee.
   * @format date-time
   * @example "2022-04-29T08:59:51Z"
   */
  from_date?: string | null;
  /**
   * The ending date of the period that the fee covers. It is applicable only to `subscription` and `charge` fees. This field indicates the end date of the billing period or subscription period associated with the fee.
   * @format date-time
   * @example "2022-05-29T08:59:51Z"
   */
  to_date?: string | null;
  /**
   * Indicates the payment status of the fee. It represents the current status of the payment associated with the fee. The possible values for this field are `pending`, `succeeded`, `failed` and `refunded`.
   * @example "pending"
   */
  payment_status: 'pending' | 'succeeded' | 'failed' | 'refunded';
  /**
   * The date and time when the fee was created. It is provided in Coordinated Universal Time (UTC) format.
   * @format date-time
   * @example "2022-08-24T14:58:59Z"
   */
  created_at?: string | null;
  /**
   * The date and time when the payment for the fee was successfully processed. It is provided in Coordinated Universal Time (UTC) format.
   * @format date-time
   * @example "2022-08-24T14:58:59Z"
   */
  succeeded_at?: string | null;
  /**
   * The date and time when the payment for the fee failed to process. It is provided in Coordinated Universal Time (UTC) format.
   * @format date-time
   * @example "2022-08-24T14:58:59Z"
   */
  failed_at?: string | null;
  /**
   * The date and time when the payment for the fee was refunded. It is provided in Coordinated Universal Time (UTC) format
   * @format date-time
   * @example "2022-08-24T14:58:59Z"
   */
  refunded_at?: string | null;
  /**
   * Unique identifier assigned to the transaction. This field is specifically displayed when the fee type is `charge` and the payment for the fee is made in advance (`pay_in_advance` is set to `true`).
   * @example "transaction_1234567890"
   */
  event_transaction_id?: string | null;
  /** Item attached to the fee */
  item: {
    /**
     * The fee type. Possible values are `add-on`, `charge`, `credit` or `subscription`.
     * @example "subscription"
     */
    type: 'charge' | 'add_on' | 'subscription' | 'credit';
    /**
     * The code of the fee item. It can be the code of the `add-o`n, the code of the `charge`, the code of the `credit` or the code of the `subscription`.
     * @example "startup"
     */
    code: string;
    /**
     * The name of the fee item. It can be the name of the `add-on`, the name of the `charge`, the name of the `credit` or the name of the `subscription`.
     * @example "Startup"
     */
    name: string;
    /**
     * Unique identifier of the fee item, created by Lago. It can be the identifier of the `add-on`, the identifier of the `charge`, the identifier of the `credit` or the identifier of the `subscription`.
     * @format uuid
     * @example "1a901a90-1a90-1a90-1a90-1a901a901a90"
     */
    lago_item_id: string;
    /**
     * The type of the fee item. Possible values are `AddOn`, `BillableMetric`, `WalletTransaction` or `Subscription`.
     * @example "Subscription"
     */
    item_type: 'AddOn' | 'BillableMetric' | 'Subscription' | 'WalletTransaction';
  };
  /** List of fee applied taxes */
  applied_taxes?: FeeAppliedTaxObject[];
}

export interface Fees {
  fees: FeeObject[];
}

export type FeesPaginated = Fees & {
  meta: PaginationMeta;
};

export interface FeeUpdateInput {
  fee: {
    /**
     * The payment status of the fee. Possible values are `pending`, `succeeded`, `failed` or `refunded`.
     * @example "succeeded"
     */
    payment_status: 'pending' | 'succeeded' | 'failed' | 'refunded';
  };
}

export interface GroupObject {
  /**
   * Unique identifier of a specific group associated with the billable metric.
   * @format uuid
   * @example "1a901a90-1a90-1a90-1a90-1a901a901a90"
   */
  lago_id: string;
  /**
   * Key of a specific group associated with the billable metric.
   * @example "region"
   */
  key: string;
  /**
   * One of the values for a specific group associated with the billable metric.
   * @example "us-east-1"
   */
  value: string;
}

export interface GroupPropertiesObject {
  /**
   * Unique identifier of a billable metric group, created by Lago.
   * @format uuid
   * @example "1a901a90-1a90-1a90-1a90-1a901a901a90"
   */
  group_id: string;
  /** List of all thresholds utilized for calculating a charge, scoped by groups used as dimensions for a single charge. */
  values: ChargeProperties;
}

export interface GroupsPaginated {
  groups: GroupObject[];
  meta: PaginationMeta;
}

export interface Invoice {
  invoice: InvoiceObjectExtended;
}

export type InvoiceAppliedTaxObject = BaseAppliedTax & {
  /**
   * Unique identifier of the invoice, created by Lago.
   * @format uuid
   * @example "1a901a90-1a90-1a90-1a90-1a901a901a90"
   */
  lago_invoice_id?: string;
  /**
   * Fees total amount on which the tax is applied
   * @example 20000
   */
  fees_amount_cents?: number;
};

export interface InvoiceMetadataObject {
  /**
   * Unique identifier assigned to the invoice metadata within the Lago application.
   * @format uuid
   * @example "1a901a90-1a90-1a90-1a90-1a901a901a90"
   */
  lago_id?: string;
  /**
   * Represents the key of the metadata’s key-value pair.
   * @example "digital_ref_id"
   */
  key?: string;
  /**
   * Represents the value of the metadata’s key-value pair.
   * @example "INV-0123456-98765"
   */
  value?: string;
  /**
   * The date and time when the metadata object was created. It follows the ISO 8601 datetime format and is expressed in Coordinated Universal Time (UTC).
   * @format date-time
   * @example "2022-04-29T08:59:51Z"
   */
  created_at?: string;
}

export interface InvoiceObject {
  /**
   * Unique identifier assigned to the fee within the Lago application. This ID is exclusively created by Lago and serves as a unique identifier for the fee’s record within the Lago system.
   * @format uuid
   * @example "1a901a90-1a90-1a90-1a90-1a901a901a90"
   */
  lago_id: string;
  /**
   * This ID helps in uniquely identifying and organizing the invoices associated with a specific customer. It provides a sequential numbering system specific to the customer, allowing for easy tracking and management of invoices within the customer's context.
   * @example 2
   */
  sequential_id: number;
  /**
   * The unique number assigned to the invoice. This number serves as a distinct identifier for the invoice and helps in differentiating it from other invoices in the system.
   * @example "LAG-1234-001-002"
   */
  number: string;
  /**
   * The date when the invoice was issued. It is provided in the ISO 8601 date format.
   * @format date
   * @example "2022-04-30"
   */
  issuing_date: string;
  /**
   * The payment due date for the invoice, specified in the ISO 8601 date format.
   * @format date
   * @example "2022-04-30"
   */
  payment_due_date?: string;
  /**
   * The net payment term, expressed in days, specifies the duration within which a customer is expected to remit payment after the invoice is finalized.
   * @example 30
   */
  net_payment_term?: number;
  /**
   * The type of invoice issued. Possible values are `subscription`, `one-off` or `credit`.
   * @example "subscription"
   */
  invoice_type: 'subscription' | 'add_on' | 'credit' | 'one_off';
  /**
   * The status of the invoice. It indicates the current state of the invoice and can have two possible values:
   * - `draft`: the invoice is in the draft state, waiting for the end of the grace period to be finalized. During this period, events can still be ingested and added to the invoice.
   * - `finalized`: the invoice has been issued and finalized. In this state, events cannot be ingested or added to the invoice anymore.
   * @example "finalized"
   */
  status: 'draft' | 'finalized';
  /**
   * The status of the payment associated with the invoice. It can have one of the following values:
   * - `pending`: the payment is pending, waiting for payment processing in Stripe or when the invoice is emitted but users have not updated the payment status through the endpoint.
   * - `succeeded`: the payment of the invoice has been successfully processed.
   * - `failed`: the payment of the invoice has failed or encountered an error during processing.
   * @example "succeeded"
   */
  payment_status: 'pending' | 'succeeded' | 'failed';
  /** The currency of the invoice issued. */
  currency: Currency;
  /**
   * The total sum of fees amount in cents. It calculates the cumulative amount of all the fees associated with the invoice, providing a consolidated value.
   * @example 100
   */
  fees_amount_cents: number;
  /**
   * The total sum of all coupons discounted on the invoice. It calculates the cumulative discount amount applied by coupons, expressed in cents.
   * @example 10
   */
  coupons_amount_cents: number;
  /**
   * The total sum of all credit notes discounted on the invoice. It calculates the cumulative discount amount applied by credit notes, expressed in cents.
   * @example 10
   */
  credit_notes_amount_cents: number;
  /**
   * Subtotal amount, excluding taxes, expressed in cents.
   * This field depends on the version number. Here are the definitions based on the version:
   * - Version 1: is equal to the sum of `fees_amount_cents`, minus `coupons_amount_cents`, and minus `prepaid_credit_amount_cents`.
   * - Version 2: is equal to the `fees_amount_cents`.
   * - Version 3: is equal to the `fees_amount_cents`, minus `coupons_amount_cents`
   * @example 100
   */
  sub_total_excluding_taxes_amount_cents: number;
  /**
   * The sum of tax amount associated with the invoice, expressed in cents.
   * @example 20
   */
  taxes_amount_cents: number;
  /**
   * Subtotal amount, including taxes, expressed in cents.
   * This field depends on the version number. Here are the definitions based on the version:
   * - Version 1: is equal to the `total_amount_cents`.
   * - Version 2: is equal to the sum of `fees_amount_cents` and `taxes_amount_cents`.
   * - Version 3: is equal to the sum `sub_total_excluding_taxes_amount_cents` and `taxes_amount_cents`
   * @example 120
   */
  sub_total_including_taxes_amount_cents: number;
  /**
   * The total sum of all prepaid credits discounted on the invoice. It calculates the cumulative discount amount applied by prepaid credits, expressed in cents.
   * @example 0
   */
  prepaid_credit_amount_cents: number;
  /**
   * The sum of the amount and taxes amount on the invoice, expressed in cents. It calculates the total financial value of the invoice, including both the original amount and any applicable taxes.
   * @example 100
   */
  total_amount_cents: number;
  /** @example 3 */
  version_number: number;
  /**
   * Contains the URL that provides direct access to the invoice PDF file. You can use this URL to download or view the PDF document of the invoice
   * @format uri
   * @example "https://getlago.com/invoice/file"
   */
  file_url?: string;
  /** The customer on which the invoice applies. It refers to the customer account or entity associated with the invoice. */
  customer?: CustomerObject;
  metadata?: InvoiceMetadataObject[];
  applied_taxes?: InvoiceAppliedTaxObject[];
}

export type InvoiceObjectExtended = InvoiceObject & {
  credits?: CreditObject[];
  fees?: FeeObject[];
  subscriptions?: SubscriptionObject[];
};

export interface InvoiceOneOffCreateInput {
  invoice: {
    /**
     * Unique identifier assigned to the customer in your application.
     * @example "hooli_1234"
     */
    external_customer_id: string;
    /** The currency of the invoice. */
    currency?: Currency;
    fees: {
      /**
       * The code of the add-on used as invoice item.
       * @example "setup_fee"
       */
      add_on_code: string;
      /**
       * The amount of the fee per unit, expressed in cents. By default, the amount of the add-on is used.
       * @example 12000
       */
      unit_amount_cents?: number | null;
      /**
       * The quantity of units associated with the fee. By default, only 1 unit is added to the invoice.
       * @pattern ^[0-9]+.?[0-9]*$
       * @example "2.5"
       */
      units?: string | null;
      /**
       * This is a description
       * @example "The description of the fee line item in the invoice. By default, the description of the add-on is used."
       */
      description?: string | null;
      /**
       * List of unique code used to identify the taxes.
       * @example ["french_standard_vat"]
       */
      tax_codes?: string[];
    }[];
  };
}

export interface InvoicesPaginated {
  invoices: InvoiceObject[];
  meta: PaginationMeta;
}

export interface InvoiceUpdateInput {
  invoice: {
    /**
     * The payment status of the invoice. Possible values are `pending`, `failed` or `succeeded`.
     * @example "succeeded"
     */
    payment_status?: 'pending' | 'succeeded' | 'failed';
    metadata?: {
      /**
       * The metadata object identifier. Only required when updating existing metadata.
       * @format uuid
       * @example "1a901a90-1a90-1a90-1a90-1a901a901a90"
       */
      id?: string;
      /**
       * The key in the key-value pair of the metadata.
       * @example "digital_ref_id"
       */
      key?: string;
      /**
       * The value in the key-value pair of the metadata.
       * @example "INV-0123456-98765"
       */
      value?: string;
    }[];
  };
}

export interface Organization {
  organization: OrganizationObject;
}

/** The custom billing settings for your organization. */
export interface OrganizationBillingConfiguration {
  /**
   * The customer invoice message that appears at the bottom of each billing documents.
   * @example "This is my customer footer"
   */
  invoice_footer?: string | null;
  /**
   * The grace period, expressed in days, for finalizing the invoice. This period refers to the additional time granted to your customers beyond the invoice due date to adjust usage and line items. Can be overwritten by the customer’s grace period.
   * @example 3
   */
  invoice_grace_period?: number;
  /**
   * The locale of the billing documents, expressed in the ISO 639-1 format. This field indicates the language or regional variant used for the documents content issued or the embeddable customer portal.
   * @example "en"
   */
  document_locale?: string;
}

export interface OrganizationObject {
  /**
   * Unique identifier assigned to the organization within the Lago application. This ID is exclusively created by Lago and serves as a unique identifier for the organization's record within the Lago system
   * @format uuid
   * @example "1a901a90-1a90-1a90-1a90-1a901a901a90"
   */
  lago_id: string;
  /**
   * The name of your organization.
   * @example "Name1"
   */
  name: string;
  /**
   * The date of creation of your organization, represented in ISO 8601 datetime format and expressed in Coordinated Universal Time (UTC).
   * @format date-time
   * @example "2022-05-02T13:04:09Z"
   */
  created_at: string | null;
  /**
   * The URL of your newest updated webhook endpoint. This URL allows your organization to receive important messages, notifications, or data from the Lago system. By configuring your webhook endpoint to this URL, you can ensure that your organization stays informed and receives relevant information in a timely manner.
   * @example "https://webhook.brex.com"
   */
  webhook_url?: string | null;
  /**
   * The array containing your webhooks URLs.
   * @example ["https://webhook.brex.com","https://webhook2.brex.com"]
   */
  webhook_urls?: string[] | null;
  /** The country of your organization. */
  country?: Country;
  /**
   * The first line of your organization’s billing address.
   * @example "100 Brex Street"
   */
  address_line1?: string | null;
  /**
   * The second line of your organization’s billing address.
   * @example null
   */
  address_line2?: string | null;
  /**
   * The state of your organization’s billing address.
   * @example "NYC"
   */
  state?: string | null;
  /**
   * The zipcode of your organization’s billing address.
   * @example "10000"
   */
  zipcode?: string | null;
  /**
   * The email address of your organization used to bill your customers.
   * @format email
   * @example "brex@brex.com"
   */
  email?: string | null;
  /**
   * The city of your organization’s billing address.
   * @example "New York"
   */
  city?: string | null;
  /**
   * The legal name of your organization.
   * @example null
   */
  legal_name?: string | null;
  /**
   * The legal number of your organization.
   * @example null
   */
  legal_number?: string | null;
  /**
   * The net payment term, expressed in days, specifies the duration within which a customer is expected to remit payment after the invoice is finalized.
   * @example 30
   */
  net_payment_term?: number;
  /**
   * The tax identification number of your organization.
   * @example "US123456789"
   */
  tax_identification_number?: string | null;
  /** Your organization’s timezone, used for billing purposes in your own local time. Can be overwritten by the customer’s timezone. */
  timezone?: Timezone;
  /** The custom billing settings for your organization. */
  billing_configuration: OrganizationBillingConfiguration;
  /** List of default organization taxes */
  taxes?: TaxObject[];
}

export interface OrganizationUpdateInput {
  organization: {
    /**
     * The URL of your newest updated webhook endpoint. This URL allows your organization to receive important messages, notifications, or data from the Lago system. By configuring your webhook endpoint to this URL, you can ensure that your organization stays informed and receives relevant information in a timely manner.
     * @example "https://webhook.brex.com"
     */
    webhook_url?: string | null;
    /** The country of your organization. */
    country?: Country;
    /**
     * The first line of your organization’s billing address.
     * @example "100 Brex Street"
     */
    address_line1?: string | null;
    /**
     * The second line of your organization’s billing address.
     * @example null
     */
    address_line2?: string | null;
    /**
     * The state of your organization’s billing address.
     * @example "NYC"
     */
    state?: string | null;
    /**
     * The zipcode of your organization’s billing address.
     * @example "10000"
     */
    zipcode?: string | null;
    /**
     * The email address of your organization used to bill your customers.
     * @format email
     * @example "brex@brex.com"
     */
    email?: string | null;
    /**
     * The city of your organization’s billing address.
     * @example "New York"
     */
    city?: string | null;
    /**
     * The legal name of your organization.
     * @example null
     */
    legal_name?: string | null;
    /**
     * The legal number of your organization.
     * @example null
     */
    legal_number?: string | null;
    /**
     * The net payment term, expressed in days, specifies the duration within which a customer is expected to remit payment after the invoice is finalized.
     * @example 30
     */
    net_payment_term?: number;
    /**
     * The tax identification number of your organization.
     * @example "US123456789"
     */
    tax_identification_number?: string | null;
    /** Your organization’s timezone, used for billing purposes in your own local time. Can be overwritten by the customer’s timezone. */
    timezone?: Timezone;
    /**
     * Represents the email settings of the organization. It allows you to define which documents are sent by email. The field value determines the types of documents that trigger email notifications. Possible values for are `invoice.finalized` and `credit_note.created`. By configuring this field, you can specify whether invoices, credit notes, or both should be sent to recipients via email.
     * @example ["invoice.finalized","credit_note.created"]
     */
    email_settings?: ('invoice.finalized' | 'credit_note.created')[];
    /** The custom billing settings for your organization. */
    billing_configuration?: OrganizationBillingConfiguration;
  };
}

export interface PaginationMeta {
  /**
   * Current page.
   * @example 2
   */
  current_page: number;
  /**
   * Next page.
   * @example 3
   */
  next_page?: number | null;
  /**
   * Previous page.
   * @example 1
   */
  prev_page?: number | null;
  /**
   * Total number of pages.
   * @example 4
   */
  total_pages: number;
  /**
   * Total number of records.
   * @example 70
   */
  total_count: number;
}

export interface Plan {
  plan: PlanObject;
}

export interface PlanCreateInput {
  plan: {
    /**
     * The name of the plan.
     * @example "Startup"
     */
    name?: string;
    /**
     * The code of the plan. It serves as a unique identifier associated with a particular plan. The code is typically used for internal or system-level identification purposes, like assigning a subscription, for instance.
     * @example "startup"
     */
    code?: string;
    /**
     * The interval used for recurring billing. It represents the frequency at which subscription billing occurs. The interval can be one of the following values: `yearly`, `quarterly`, `monthly`, or `weekly`.
     * @example "monthly"
     */
    interval?: 'weekly' | 'monthly' | 'quarterly' | 'yearly';
    /**
     * The description on the plan.
     * @example "Plan for early stage startups."
     */
    description?: string;
    /**
     * The base cost of the plan, excluding any applicable taxes, that is billed on a recurring basis. This value is defined at 0 if your plan is a pay-as-you-go plan.
     * @example 10000
     */
    amount_cents?: number;
    /** The currency of the plan. It indicates the monetary unit in which the plan's cost, including taxes and usage-based charges, is expressed. */
    amount_currency?: Currency;
    /**
     * The duration in days during which the base cost of the plan is offered for free.
     * @example 5
     */
    trial_period?: number;
    /**
     * This field determines the billing timing for the plan. When set to `true`, the base cost of the plan is due at the beginning of each billing period. Conversely, when set to `false`, the base cost of the plan is due at the end of each billing period.
     * @example true
     */
    pay_in_advance?: boolean;
    /**
     * This field, when set to `true`, enables to invoice usage-based charges on monthly basis, even if the cadence of the plan is yearly. This allows customers to pay charges overage on a monthly basis. This can be set to true only if the plan’s interval is `yearly`.
     * @example null
     */
    bill_charges_monthly?: boolean | null;
    /**
     * List of unique code used to identify the taxes.
     * @example ["french_standard_vat"]
     */
    tax_codes?: string[];
    /**
     * Additional usage-based charges for this plan.
     * @example [{"billable_metric_id":"1a901a90-1a90-1a90-1a90-1a901a901a91","charge_model":"package","invoiceable":true,"pay_in_advance":false,"prorated":false,"min_amount_cents":3000,"properties":{"amount":"30","free_units":100,"package_size":1000},"group_properties":[],"tax_codes":["french_standard_vat"]},{"billable_metric_id":"1a901a90-1a90-1a90-1a90-1a901a901a92","charge_model":"graduated","invoiceable":true,"pay_in_advance":false,"prorated":false,"min_amount_cents":0,"properties":{"graduated_ranges":[{"to_value":10,"from_value":0,"flat_amount":"10","per_unit_amount":"0.5"},{"to_value":null,"from_value":11,"flat_amount":"0","per_unit_amount":"0.4"}]},"group_properties":[]},{"billable_metric_id":"1a901a90-1a90-1a90-1a90-1a901a901a93","charge_model":"standard","invoiceable":true,"pay_in_advance":true,"prorated":false,"min_amount_cents":0,"properties":{},"group_properties":[{"group_id":"1a901a90-1a90-1a90-1a90-1a901a901a01","values":{"amount":"10"}},{"group_id":"1a901a90-1a90-1a90-1a90-1a901a901a02","values":{"amount":"5"}},{"group_id":"1a901a90-1a90-1a90-1a90-1a901a901a03","values":{"amount":"8"}}]},{"billable_metric_id":"1a901a90-1a90-1a90-1a90-1a901a901a94","charge_model":"volume","invoiceable":true,"pay_in_advance":false,"prorated":false,"min_amount_cents":0,"properties":{"volume_ranges":[{"from_value":0,"to_value":100,"flat_amount":"0","per_unit_amount":"0"},{"from_value":101,"to_value":null,"flat_amount":"0","per_unit_amount":"0.5"}]},"group_properties":[]},{"billable_metric_id":"1a901a90-1a90-1a90-1a90-1a901a901a95","charge_model":"percentage","invoiceable":false,"pay_in_advance":true,"prorated":false,"min_amount_cents":0,"properties":{"rate":"1","fixed_amount":"0.5","free_units_per_events":5,"free_units_per_total_aggregation":"500"},"group_properties":[]}]
     */
    charges?: {
      /**
       * Unique identifier of the billable metric created by Lago.
       * @format uuid
       * @example "1a901a90-1a90-1a90-1a90-1a901a901a90"
       */
      billable_metric_id?: string;
      /**
       * Specifies the pricing model used for the calculation of the final fee. It can be `standard`, `graduated`, `graduated_percentage` `package`, `percentage` or `volume`.
       * @example "standard"
       */
      charge_model?: 'standard' | 'graduated' | 'graduated_percentage' | 'package' | 'percentage' | 'volume';
      /**
       * This field determines the billing timing for this specific usage-based charge. When set to `true`, the charge is due and invoiced immediately. Conversely, when set to false, the charge is due and invoiced at the end of each billing period.
       * @example false
       */
      pay_in_advance?: boolean;
      /**
       * This field specifies whether the charge should be included in a proper invoice. If set to false, no invoice will be issued for this charge. You can only set it to `false` when `pay_in_advance` is `true`.
       * @example true
       */
      invoiceable?: boolean;
      /**
       * Specifies whether a charge is prorated based on the remaining number of days in the billing period or billed fully.
       *
       * - If set to `true`, the charge is prorated based on the remaining days in the current billing period.
       * - If set to `false`, the charge is billed in full.
       * - If not defined in the request, default value is `false`.
       * @example false
       */
      prorated?: boolean;
      /**
       * The minimum spending amount required for the charge, measured in cents and excluding any applicable taxes. It indicates the minimum amount that needs to be charged for each billing period.
       * @example 0
       */
      min_amount_cents?: number;
      /** List of all thresholds utilized for calculating the charge. */
      properties?: ChargeProperties;
      /** All charge information, sorted by groups. */
      group_properties?: {
        /**
         * Unique identifier of a billable metric group, created by Lago.
         * @example "1a901a90-1a90-1a90-1a90-1a901a901a90"
         */
        group_id: string;
        /** List of all thresholds utilized for calculating a charge, scoped by groups used as dimensions for a single charge. */
        values: ChargeProperties;
      }[];
      /**
       * List of unique code used to identify the taxes.
       * @example ["french_standard_vat"]
       */
      tax_codes?: string[];
    }[];
  };
}

export interface PlanUpdateInput {
  plan: {
    /**
     * The name of the plan.
     * @example "Startup"
     */
    name?: string;
    /**
     * The code of the plan. It serves as a unique identifier associated with a particular plan. The code is typically used for internal or system-level identification purposes, like assigning a subscription, for instance.
     * @example "startup"
     */
    code?: string;
    /**
     * The interval used for recurring billing. It represents the frequency at which subscription billing occurs. The interval can be one of the following values: `yearly`, `quarterly`, `monthly`, or `weekly`.
     * @example "monthly"
     */
    interval?: 'weekly' | 'monthly' | 'quarterly' | 'yearly';
    /**
     * The description on the plan.
     * @example "Plan for early stage startups."
     */
    description?: string;
    /**
     * The base cost of the plan, excluding any applicable taxes, that is billed on a recurring basis. This value is defined at 0 if your plan is a pay-as-you-go plan.
     * @example 10000
     */
    amount_cents?: number;
    /** The currency of the plan. It indicates the monetary unit in which the plan's cost, including taxes and usage-based charges, is expressed. */
    amount_currency?: Currency;
    /**
     * The duration in days during which the base cost of the plan is offered for free.
     * @example 5
     */
    trial_period?: number;
    /**
     * This field determines the billing timing for the plan. When set to `true`, the base cost of the plan is due at the beginning of each billing period. Conversely, when set to `false`, the base cost of the plan is due at the end of each billing period.
     * @example true
     */
    pay_in_advance?: boolean;
    /**
     * This field, when set to `true`, enables to invoice usage-based charges on monthly basis, even if the cadence of the plan is yearly. This allows customers to pay charges overage on a monthly basis. This can be set to true only if the plan’s interval is `yearly`.
     * @example null
     */
    bill_charges_monthly?: boolean | null;
    /**
     * List of unique code used to identify the taxes.
     * @example ["french_standard_vat"]
     */
    tax_codes?: string[];
    /**
     * Additional usage-based charges for this plan.
     * @example [{"billable_metric_id":"1a901a90-1a90-1a90-1a90-1a901a901a91","charge_model":"package","invoiceable":true,"pay_in_advance":false,"prorated":false,"min_amount_cents":3000,"properties":{"amount":"30","free_units":100,"package_size":1000},"group_properties":[],"tax_codes":["french_standard_vat"]},{"billable_metric_id":"1a901a90-1a90-1a90-1a90-1a901a901a92","charge_model":"graduated","invoiceable":true,"pay_in_advance":false,"prorated":false,"min_amount_cents":0,"properties":{"graduated_ranges":[{"to_value":10,"from_value":0,"flat_amount":"10","per_unit_amount":"0.5"},{"to_value":null,"from_value":11,"flat_amount":"0","per_unit_amount":"0.4"}]},"group_properties":[]},{"billable_metric_id":"1a901a90-1a90-1a90-1a90-1a901a901a93","charge_model":"standard","invoiceable":true,"pay_in_advance":true,"prorated":false,"min_amount_cents":0,"properties":{},"group_properties":[{"group_id":"1a901a90-1a90-1a90-1a90-1a901a901a01","values":{"amount":"10"}},{"group_id":"1a901a90-1a90-1a90-1a90-1a901a901a02","values":{"amount":"5"}},{"group_id":"1a901a90-1a90-1a90-1a90-1a901a901a03","values":{"amount":"8"}}]},{"billable_metric_id":"1a901a90-1a90-1a90-1a90-1a901a901a94","charge_model":"volume","invoiceable":true,"pay_in_advance":false,"prorated":false,"min_amount_cents":0,"properties":{"volume_ranges":[{"from_value":0,"to_value":100,"flat_amount":"0","per_unit_amount":"0"},{"from_value":101,"to_value":null,"flat_amount":"0","per_unit_amount":"0.5"}]},"group_properties":[]},{"billable_metric_id":"1a901a90-1a90-1a90-1a90-1a901a901a95","charge_model":"percentage","invoiceable":false,"pay_in_advance":true,"prorated":false,"min_amount_cents":0,"properties":{"rate":"1","fixed_amount":"0.5","free_units_per_events":5,"free_units_per_total_aggregation":"500"},"group_properties":[]}]
     */
    charges?: {
      /**
       * Unique identifier of the charge created by Lago.
       * @format uuid
       * @example "1a901a90-1a90-1a90-1a90-1a901a901a90"
       */
      id?: string;
      /**
       * Unique identifier of the billable metric created by Lago.
       * @format uuid
       * @example "1a901a90-1a90-1a90-1a90-1a901a901a90"
       */
      billable_metric_id?: string;
      /**
       * Specifies the pricing model used for the calculation of the final fee. It can be `standard`, `graduated`, `graduated_percentage`, `package`, `percentage` or `volume`.
       * @example "standard"
       */
      charge_model?: 'standard' | 'graduated' | 'graduated_percentage' | 'package' | 'percentage' | 'volume';
      /**
       * This field determines the billing timing for this specific usage-based charge. When set to `true`, the charge is due and invoiced immediately. Conversely, when set to false, the charge is due and invoiced at the end of each billing period.
       * @example false
       */
      pay_in_advance?: boolean;
      /**
       * This field specifies whether the charge should be included in a proper invoice. If set to false, no invoice will be issued for this charge. You can only set it to `false` when `pay_in_advance` is `true`.
       * @example true
       */
      invoiceable?: boolean;
      /**
       * Specifies whether a charge is prorated based on the remaining number of days in the billing period or billed fully.
       *
       * - If set to `true`, the charge is prorated based on the remaining days in the current billing period.
       * - If set to `false`, the charge is billed in full.
       * - If not defined in the request, default value is `false`.
       * @example false
       */
      prorated?: boolean;
      /**
       * The minimum spending amount required for the charge, measured in cents and excluding any applicable taxes. It indicates the minimum amount that needs to be charged for each billing period.
       * @example 0
       */
      min_amount_cents?: number;
      /** List of all thresholds utilized for calculating the charge. */
      properties?: ChargeProperties;
      /** All charge information, sorted by groups. */
      group_properties?: {
        /**
         * Unique identifier of a billable metric group, created by Lago.
         * @example "1a901a90-1a90-1a90-1a90-1a901a901a90"
         */
        group_id: string;
        /** List of all thresholds utilized for calculating a charge, scoped by groups used as dimensions for a single charge. */
        values: ChargeProperties;
      }[];
      /**
       * List of unique code used to identify the taxes.
       * @example ["french_standard_vat"]
       */
      tax_codes?: string[];
    }[];
  };
}

export interface PlanObject {
  /**
   * Unique identifier of the plan created by Lago.
   * @format uuid
   * @example "1a901a90-1a90-1a90-1a90-1a901a901a90"
   */
  lago_id: string;
  /**
   * The name of the plan.
   * @example "Startup"
   */
  name: string;
  /**
   * The date and time when the plan was created. It is expressed in UTC format according to the ISO 8601 datetime standard. This field provides the timestamp for the exact moment when the plan was initially created.
   * @format date-time
   * @example "2023-06-27T19:43:42Z"
   */
  created_at: string;
  /**
   * The code of the plan. It serves as a unique identifier associated with a particular plan. The code is typically used for internal or system-level identification purposes, like assigning a subscription, for instance.
   * @example "startup"
   */
  code: string;
  /**
   * The interval used for recurring billing. It represents the frequency at which subscription billing occurs. The interval can be one of the following values: `yearly`, `quarterly`, `monthly` or `weekly`.
   * @example "monthly"
   */
  interval: 'weekly' | 'monthly' | 'quarterly' | 'yearly';
  /**
   * The description on the plan.
   * @example ""
   */
  description?: string;
  /**
   * The base cost of the plan, excluding any applicable taxes, that is billed on a recurring basis. This value is defined at 0 if your plan is a pay-as-you-go plan.
   * @example 10000
   */
  amount_cents: number;
  /** The currency of the plan. It indicates the monetary unit in which the plan's cost, including taxes and usage-based charges, is expressed. */
  amount_currency: Currency;
  /**
   * The duration in days during which the base cost of the plan is offered for free.
   * @example 5
   */
  trial_period?: number;
  /**
   * This field determines the billing timing for the plan. When set to `true`, the base cost of the plan is due at the beginning of each billing period. Conversely, when set to `false`, the base cost of the plan is due at the end of each billing period.
   * @example true
   */
  pay_in_advance?: boolean;
  /**
   * This field, when set to `true`, enables to invoice usage-based charges on monthly basis, even if the cadence of the plan is yearly. This allows customers to pay charges overage on a monthly basis. This can be set to true only if the plan’s interval is `yearly`.
   * @example null
   */
  bill_charges_monthly?: boolean | null;
  /**
   * The count of active subscriptions that are currently associated with the plan. This field provides valuable information regarding the impact of deleting the plan. By checking the value of this field, you can determine the number of subscriptions that will be affected if the plan is deleted.
   * @example 0
   */
  active_subscriptions_count: number;
  /**
   * The number of draft invoices that include a subscription attached to the plan. This field provides valuable information about the impact of deleting the plan. By checking the value of this field, you can determine the number of draft invoices that will be affected if the plan is deleted.
   * @example 0
   */
  draft_invoices_count: number;
  /**
   * Additional usage-based charges for this plan.
   * @example [{"lago_id":"1a901a90-1a90-1a90-1a90-1a901a901a91","lago_billable_metric_id":"1a901a90-1a90-1a90-1a90-1a901a901a91","billable_metric_code":"requests","created_at":"2023-06-27T19:43:42Z","charge_model":"package","invoiceable":true,"pay_in_advance":false,"prorated":false,"min_amount_cents":3000,"properties":{"amount":"30","free_units":100,"package_size":1000},"group_properties":[]},{"lago_id":"1a901a90-1a90-1a90-1a90-1a901a901a92","lago_billable_metric_id":"1a901a90-1a90-1a90-1a90-1a901a901a92","billable_metric_code":"cpu","created_at":"2023-06-27T19:43:42Z","charge_model":"graduated","invoiceable":true,"pay_in_advance":false,"prorated":false,"min_amount_cents":0,"properties":{"graduated_ranges":[{"from_value":0,"to_value":10,"flat_amount":"10","per_unit_amount":"0.5"},{"from_value":11,"to_value":null,"flat_amount":"0","per_unit_amount":"0.4"}]},"group_properties":[]},{"lago_id":"1a901a90-1a90-1a90-1a90-1a901a901a93","lago_billable_metric_id":"1a901a90-1a90-1a90-1a90-1a901a901a93","billable_metric_code":"seats","created_at":"2023-06-27T19:43:42Z","charge_model":"standard","invoiceable":true,"pay_in_advance":true,"prorated":false,"min_amount_cents":0,"properties":{},"group_properties":[{"group_id":"1a901a90-1a90-1a90-1a90-1a901a901a01","values":{"amount":"10"}},{"group_id":"1a901a90-1a90-1a90-1a90-1a901a901a02","values":{"amount":"5"}},{"group_id":"1a901a90-1a90-1a90-1a90-1a901a901a03","values":{"amount":"8"}}]},{"lago_id":"1a901a90-1a90-1a90-1a90-1a901a901a94","lago_billable_metric_id":"1a901a90-1a90-1a90-1a90-1a901a901a94","billable_metric_code":"storage","created_at":"2023-06-27T19:43:42Z","charge_model":"volume","invoiceable":true,"pay_in_advance":false,"prorated":false,"min_amount_cents":0,"properties":{"volume_ranges":[{"from_value":0,"to_value":100,"flat_amount":"0","per_unit_amount":"0"},{"from_value":101,"to_value":null,"flat_amount":"0","per_unit_amount":"0.5"}]},"group_properties":[]},{"lago_id":"1a901a90-1a90-1a90-1a90-1a901a901a95","lago_billable_metric_id":"1a901a90-1a90-1a90-1a90-1a901a901a95","billable_metric_code":"payments","created_at":"2023-06-27T19:43:42Z","charge_model":"percentage","invoiceable":false,"pay_in_advance":true,"prorated":false,"min_amount_cents":0,"properties":{"rate":"1","fixed_amount":"0.5","free_units_per_events":5,"free_units_per_total_aggregation":"500"},"group_properties":[]}]
   */
  charges?: ChargeObject[];
  /** All taxes applied to the plan. */
  taxes?: TaxObject[];
}

export interface PlansPaginated {
  plans: PlanObject[];
  meta: PaginationMeta;
}

export interface Subscription {
  subscription: SubscriptionObject;
}

export interface SubscriptionCreateInput {
  subscription: {
    /**
     * The customer external unique identifier (provided by your own application)
     * @example "5eb02857-a71e-4ea2-bcf9-57d3a41bc6ba"
     */
    external_customer_id: string;
    /**
     * The unique code representing the plan to be attached to the customer. This code must correspond to the `code` property of one of the active plans.
     * @example "premium"
     */
    plan_code: string;
    /**
     * The display name of the subscription on an invoice. This field allows for customization of the subscription's name for billing purposes, especially useful when a single customer has multiple subscriptions using the same plan.
     * @example "Repository A"
     */
    name?: string;
    /**
     * The unique external identifier for the subscription. This identifier serves as an idempotency key, ensuring that each subscription is unique.
     * @example "my_sub_1234567890"
     */
    external_id: string;
    /**
     * The billing time for the subscription, which can be set as either `anniversary` or `calendar`. If not explicitly provided, it will default to `calendar`. The billing time determines the timing of recurring billing cycles for the subscription. By specifying `anniversary`, the billing cycle will be based on the specific date the subscription started (billed fully), while `calendar` sets the billing cycle at the first day of the week/month/year (billed with proration).
     * @example "anniversary"
     */
    billing_time?: 'calendar' | 'anniversary';
    /**
     * The start date for the subscription, allowing for the creation of subscriptions that can begin in the past or future. Please note that it cannot be used to update the start date of a pending subscription or schedule an upgrade/downgrade. The start_date should be provided in ISO 8601 datetime format and expressed in Coordinated Universal Time (UTC).
     * @format date-time
     * @example "2022-08-08T00:00:00Z"
     */
    subscription_at?: string;
  };
}

export interface SubscriptionUpdateInput {
  subscription: {
    /**
     * The display name of the subscription on an invoice. This field allows for customization of the subscription's name for billing purposes, especially useful when a single customer has multiple subscriptions using the same plan.
     * @example "Repository B"
     */
    name?: string | null;
    /**
     * The start date and time of the subscription. This field can only be modified for pending subscriptions that have not yet started. This date should be provided in ISO 8601 datetime format and expressed in Coordinated Universal Time (UTC).
     * @format date-time
     * @example "2022-08-08T00:00:00Z"
     */
    subscription_at?: string;
  };
}

export interface SubscriptionObject {
  /**
   * Unique identifier assigned to the subscription within the Lago application. This ID is exclusively created by Lago and serves as a unique identifier for the subscription’s record within the Lago system
   * @format uuid
   * @example "1a901a90-1a90-1a90-1a90-1a901a901a90"
   */
  lago_id: string;
  /**
   * The subscription external unique identifier (provided by your own application).
   * @example "5eb02857-a71e-4ea2-bcf9-57d3a41bc6ba"
   */
  external_id: string;
  /**
   * Unique identifier assigned to the customer within the Lago application. This ID is exclusively created by Lago and serves as a unique identifier for the customer's record within the Lago system
   * @format uuid
   * @example "1a901a90-1a90-1a90-1a90-1a901a901a90"
   */
  lago_customer_id: string;
  /**
   * The customer external unique identifier (provided by your own application).
   * @example "5eb02857-a71e-4ea2-bcf9-57d3a41bc6ba"
   */
  external_customer_id: string;
  /**
   * The billing time for the subscription, which can be set as either `anniversary` or `calendar`. If not explicitly provided, it will default to `calendar`. The billing time determines the timing of recurring billing cycles for the subscription. By specifying `anniversary`, the billing cycle will be based on the specific date the subscription started (billed fully), while `calendar` sets the billing cycle at the first day of the week/month/year (billed with proration).
   * @example "anniversary"
   */
  billing_time: 'calendar' | 'anniversary';
  /**
   * The display name of the subscription on an invoice. This field allows for customization of the subscription's name for billing purposes, especially useful when a single customer has multiple subscriptions using the same plan.
   * @example "Repository A"
   */
  name?: string | null;
  /**
   * The unique code representing the plan to be attached to the customer. This code must correspond to the `code` property of one of the active plans.
   * @example "premium"
   */
  plan_code: string;
  /**
   * The status of the subscription, which can have the following values:
   * - `pending`: a previous subscription has been downgraded, and the current one is awaiting automatic activation at the end of the billing period.
   * - `active`: the subscription is currently active and applied to the customer.
   * - `terminated`: the subscription is no longer active.
   * - `canceled`: the subscription has been stopped before its activation. This can occur when two consecutive downgrades have been applied to a customer or when a subscription with a pending status is terminated.
   * @example "active"
   */
  status: 'active' | 'pending' | 'terminated' | 'canceled';
  /**
   * The creation date of the subscription, represented in ISO 8601 datetime format and expressed in Coordinated Universal Time (UTC). This date provides a timestamp indicating when the subscription was initially created.
   * @format date-time
   * @example "2022-08-08T00:00:00Z"
   */
  created_at: string;
  /**
   * The cancellation date of the subscription. This field is not null when the subscription is `canceled`. This date should be provided in ISO 8601 datetime format and expressed in Coordinated Universal Time (UTC).
   * @format date-time
   * @example "2022-09-14T16:35:31Z"
   */
  canceled_at?: string | null;
  /**
   * The effective start date of the subscription. This field can be null if the subscription is `pending` or `canceled`. This date should be provided in ISO 8601 datetime format and expressed in Coordinated Universal Time (UTC).
   * @format date-time
   * @example "2022-08-08T00:00:00Z"
   */
  started_at?: string | null;
  /**
   * The anniversary date and time of the initial subscription. This date serves as the basis for billing subscriptions with `anniversary` billing time. The `anniversary_date` should be provided in ISO 8601 datetime format and expressed in Coordinated Universal Time (UTC).
   * @format date-time
   * @example "2022-08-08T00:00:00Z"
   */
  subscription_at: string;
  /**
   * The termination date of the subscription. This field is not null when the subscription is `terminated`. This date should be provided in ISO 8601 datetime format and expressed in Coordinated Universal Time (UTC)
   * @format date-time
   * @example "2022-09-14T16:35:31Z"
   */
  terminated_at?: string | null;
  /**
   * The code identifying the previous plan associated with this subscription.
   * @example null
   */
  previous_plan_code?: string | null;
  /**
   * The code identifying the next plan in the case of a downgrade.
   * @example null
   */
  next_plan_code?: string | null;
  /**
   * The date when the plan will be downgraded, represented in ISO 8601 date format.
   * @format date-time
   * @example null
   */
  downgrade_plan_date?: string | null;
}

export interface SubscriptionsPaginated {
  subscriptions: SubscriptionObject[];
  meta: PaginationMeta;
}

export interface Tax {
  tax: TaxObject;
}

export interface TaxBaseInput {
  /**
   * Name of the tax.
   * @example "TVA"
   */
  name?: string;
  /**
   * Unique code used to identify the tax associated with the API request.
   * @example "french_standard_vat"
   */
  code?: string;
  /**
   * The percentage rate of the tax
   * @pattern ^[0-9]+.?[0-9]*$
   * @example "20.0"
   */
  rate?: string;
  /**
   * Internal description of the taxe
   * @example "French standard VAT"
   */
  description?: string | null;
  /**
   * Set to `true` if the tax is used as one of the organization's default
   * @example true
   */
  applied_to_organization?: boolean;
}

export interface TaxCreateInput {
  tax: TaxBaseInput;
}

export interface TaxesPaginated {
  taxes: TaxObject[];
  meta: PaginationMeta;
}

export interface TaxObject {
  /**
   * Unique identifier of the tax, created by Lago.
   * @format uuid
   * @example "1a901a90-1a90-1a90-1a90-1a901a901a90"
   */
  lago_id: string;
  /**
   * Name of the tax.
   * @example "TVA"
   */
  name: string;
  /**
   * Unique code used to identify the tax associated with the API request.
   * @example "french_standard_vat"
   */
  code: string;
  /**
   * Internal description of the taxe
   * @example "French standard VAT"
   */
  description?: string;
  /**
   * The percentage rate of the tax
   * @example 20
   */
  rate: number;
  /**
   * Set to `true` if the tax is used as one of the organization's default
   * @example true
   */
  applied_to_organization: boolean;
  /**
   * Number of add-ons this tax is applied to.
   * @example 0
   */
  add_ons_count?: number;
  /**
   * Number of charges this tax is applied to.
   * @example 0
   */
  charges_count?: number;
  /**
   * Number of customers this tax is applied to (directly or via the organization's default).
   * @example 0
   */
  customers_count: number;
  /**
   * Number of plans this tax is applied to.
   * @example 0
   */
  plans_count?: number;
  /**
   * Creation date of the tax.
   * @format date-time
   * @example "2023-07-06T14:35:58Z"
   */
  created_at: string;
}

export interface TaxUpdateInput {
  tax: TaxBaseInput;
}

/** @example "America/Los_Angeles" */
export enum Timezone {
  UTC = 'UTC',
  AfricaAlgiers = 'Africa/Algiers',
  AfricaCairo = 'Africa/Cairo',
  AfricaCasablanca = 'Africa/Casablanca',
  AfricaHarare = 'Africa/Harare',
  AfricaJohannesburg = 'Africa/Johannesburg',
  AfricaMonrovia = 'Africa/Monrovia',
  AfricaNairobi = 'Africa/Nairobi',
  AmericaArgentinaBuenosAires = 'America/Argentina/Buenos_Aires',
  AmericaBogota = 'America/Bogota',
  AmericaCaracas = 'America/Caracas',
  AmericaChicago = 'America/Chicago',
  AmericaChihuahua = 'America/Chihuahua',
  AmericaDenver = 'America/Denver',
  AmericaGodthab = 'America/Godthab',
  AmericaGuatemala = 'America/Guatemala',
  AmericaGuyana = 'America/Guyana',
  AmericaHalifax = 'America/Halifax',
  AmericaIndianaIndianapolis = 'America/Indiana/Indianapolis',
  AmericaJuneau = 'America/Juneau',
  AmericaLaPaz = 'America/La_Paz',
  AmericaLima = 'America/Lima',
  AmericaLosAngeles = 'America/Los_Angeles',
  AmericaMazatlan = 'America/Mazatlan',
  AmericaMexicoCity = 'America/Mexico_City',
  AmericaMonterrey = 'America/Monterrey',
  AmericaMontevideo = 'America/Montevideo',
  AmericaNewYork = 'America/New_York',
  AmericaPhoenix = 'America/Phoenix',
  AmericaPuertoRico = 'America/Puerto_Rico',
  AmericaRegina = 'America/Regina',
  AmericaSantiago = 'America/Santiago',
  AmericaSaoPaulo = 'America/Sao_Paulo',
  AmericaStJohns = 'America/St_Johns',
  AmericaTijuana = 'America/Tijuana',
  AsiaAlmaty = 'Asia/Almaty',
  AsiaBaghdad = 'Asia/Baghdad',
  AsiaBaku = 'Asia/Baku',
  AsiaBangkok = 'Asia/Bangkok',
  AsiaChongqing = 'Asia/Chongqing',
  AsiaColombo = 'Asia/Colombo',
  AsiaDhaka = 'Asia/Dhaka',
  AsiaHongKong = 'Asia/Hong_Kong',
  AsiaIrkutsk = 'Asia/Irkutsk',
  AsiaJakarta = 'Asia/Jakarta',
  AsiaJerusalem = 'Asia/Jerusalem',
  AsiaKabul = 'Asia/Kabul',
  AsiaKamchatka = 'Asia/Kamchatka',
  AsiaKarachi = 'Asia/Karachi',
  AsiaKathmandu = 'Asia/Kathmandu',
  AsiaKolkata = 'Asia/Kolkata',
  AsiaKrasnoyarsk = 'Asia/Krasnoyarsk',
  AsiaKualaLumpur = 'Asia/Kuala_Lumpur',
  AsiaKuwait = 'Asia/Kuwait',
  AsiaMagadan = 'Asia/Magadan',
  AsiaMuscat = 'Asia/Muscat',
  AsiaNovosibirsk = 'Asia/Novosibirsk',
  AsiaRangoon = 'Asia/Rangoon',
  AsiaRiyadh = 'Asia/Riyadh',
  AsiaSeoul = 'Asia/Seoul',
  AsiaShanghai = 'Asia/Shanghai',
  AsiaSingapore = 'Asia/Singapore',
  AsiaSrednekolymsk = 'Asia/Srednekolymsk',
  AsiaTaipei = 'Asia/Taipei',
  AsiaTashkent = 'Asia/Tashkent',
  AsiaTbilisi = 'Asia/Tbilisi',
  AsiaTehran = 'Asia/Tehran',
  AsiaTokyo = 'Asia/Tokyo',
  AsiaUlaanbaatar = 'Asia/Ulaanbaatar',
  AsiaUrumqi = 'Asia/Urumqi',
  AsiaVladivostok = 'Asia/Vladivostok',
  AsiaYakutsk = 'Asia/Yakutsk',
  AsiaYekaterinburg = 'Asia/Yekaterinburg',
  AsiaYerevan = 'Asia/Yerevan',
  AtlanticAzores = 'Atlantic/Azores',
  AtlanticCapeVerde = 'Atlantic/Cape_Verde',
  AtlanticSouthGeorgia = 'Atlantic/South_Georgia',
  AustraliaAdelaide = 'Australia/Adelaide',
  AustraliaBrisbane = 'Australia/Brisbane',
  AustraliaDarwin = 'Australia/Darwin',
  AustraliaHobart = 'Australia/Hobart',
  AustraliaMelbourne = 'Australia/Melbourne',
  AustraliaPerth = 'Australia/Perth',
  AustraliaSydney = 'Australia/Sydney',
  EuropeAmsterdam = 'Europe/Amsterdam',
  EuropeAthens = 'Europe/Athens',
  EuropeBelgrade = 'Europe/Belgrade',
  EuropeBerlin = 'Europe/Berlin',
  EuropeBratislava = 'Europe/Bratislava',
  EuropeBrussels = 'Europe/Brussels',
  EuropeBucharest = 'Europe/Bucharest',
  EuropeBudapest = 'Europe/Budapest',
  EuropeCopenhagen = 'Europe/Copenhagen',
  EuropeDublin = 'Europe/Dublin',
  EuropeHelsinki = 'Europe/Helsinki',
  EuropeIstanbul = 'Europe/Istanbul',
  EuropeKaliningrad = 'Europe/Kaliningrad',
  EuropeKiev = 'Europe/Kiev',
  EuropeLisbon = 'Europe/Lisbon',
  EuropeLjubljana = 'Europe/Ljubljana',
  EuropeLondon = 'Europe/London',
  EuropeMadrid = 'Europe/Madrid',
  EuropeMinsk = 'Europe/Minsk',
  EuropeMoscow = 'Europe/Moscow',
  EuropeParis = 'Europe/Paris',
  EuropePrague = 'Europe/Prague',
  EuropeRiga = 'Europe/Riga',
  EuropeRome = 'Europe/Rome',
  EuropeSamara = 'Europe/Samara',
  EuropeSarajevo = 'Europe/Sarajevo',
  EuropeSkopje = 'Europe/Skopje',
  EuropeSofia = 'Europe/Sofia',
  EuropeStockholm = 'Europe/Stockholm',
  EuropeTallinn = 'Europe/Tallinn',
  EuropeVienna = 'Europe/Vienna',
  EuropeVilnius = 'Europe/Vilnius',
  EuropeVolgograd = 'Europe/Volgograd',
  EuropeWarsaw = 'Europe/Warsaw',
  EuropeZagreb = 'Europe/Zagreb',
  EuropeZurich = 'Europe/Zurich',
  GMT12 = 'GMT+12',
  PacificApia = 'Pacific/Apia',
  PacificAuckland = 'Pacific/Auckland',
  PacificChatham = 'Pacific/Chatham',
  PacificFakaofo = 'Pacific/Fakaofo',
  PacificFiji = 'Pacific/Fiji',
  PacificGuadalcanal = 'Pacific/Guadalcanal',
  PacificGuam = 'Pacific/Guam',
  PacificHonolulu = 'Pacific/Honolulu',
  PacificMajuro = 'Pacific/Majuro',
  PacificMidway = 'Pacific/Midway',
  PacificNoumea = 'Pacific/Noumea',
  PacificPagoPago = 'Pacific/Pago_Pago',
  PacificPortMoresby = 'Pacific/Port_Moresby',
  PacificTongatapu = 'Pacific/Tongatapu',
}

export interface Wallet {
  wallet: WalletObject;
}

export interface WalletCreateInput {
  wallet?: {
    /**
     * The name of the wallet.
     * @example "Prepaid"
     */
    name?: string;
    /**
     * The rate of conversion between credits and the amount in the specified currency. It indicates the ratio or factor used to convert credits into the corresponding monetary value in the currency of the transaction.
     * @pattern ^[0-9]+.?[0-9]*$
     * @example "1.5"
     */
    rate_amount: string;
    /** The currency of the wallet. */
    currency: Currency;
    /**
     * The number of paid credits. Required only if there is no granted credits.
     * @pattern ^[0-9]+.?[0-9]*$
     * @example "20.0"
     */
    paid_credits?: string | null;
    /**
     * The number of free granted credits. Required only if there is no paid credits.
     * @pattern ^[0-9]+.?[0-9]*$
     * @example "10.0"
     */
    granted_credits?: string | null;
    /**
     * The customer external unique identifier (provided by your own application)
     * @example "hooli_1234"
     */
    external_customer_id: string;
    /**
     * The date and time that determines when the wallet will expire. It follows the ISO 8601 datetime format and is expressed in Coordinated Universal Time (UTC).
     * @format date-time
     * @example "2022-07-07T23:59:59Z"
     */
    expiration_at?: string | null;
  };
}

export interface WalletObject {
  /**
   * Unique identifier assigned to the wallet within the Lago application. This ID is exclusively created by Lago and serves as a unique identifier for the wallet’s record within the Lago system.
   * @format uuid
   * @example "1a901a90-1a90-1a90-1a90-1a901a901a90"
   */
  lago_id: string;
  /**
   * Unique identifier assigned to the customer within the Lago application. This ID is exclusively created by Lago and serves as a unique identifier for the customer’s record within the Lago system.
   * @format uuid
   * @example "1a901a90-1a90-1a90-1a90-1a901a901a90"
   */
  lago_customer_id: string;
  /**
   * The customer external unique identifier (provided by your own application)
   * @example "hooli_1234"
   */
  external_customer_id: string;
  /**
   * The status of the wallet. Possible values are `active` or `terminated`.
   * @example "active"
   */
  status: 'active' | 'terminated';
  /** The currency of the wallet. */
  currency: Currency;
  /**
   * The name of the wallet.
   * @example "Prepaid"
   */
  name?: string;
  /**
   * The rate of conversion between credits and the amount in the specified currency. It indicates the ratio or factor used to convert credits into the corresponding monetary value in the currency of the transaction.
   * @pattern ^[0-9]+.?[0-9]*$
   * @example "1.5"
   */
  rate_amount: string;
  /**
   * The current wallet balance expressed in credits.
   * @pattern ^[0-9]+.?[0-9]*$
   * @example "28.0"
   */
  credits_balance: string;
  /**
   * The current wallet balance expressed in cents.
   * @example 1000
   */
  balance_cents: number;
  /**
   * The number of consumed credits.
   * @pattern ^[0-9]+.?[0-9]*$
   * @example "2.0"
   */
  consumed_credits: string;
  /**
   * The date of the wallet creation, represented in ISO 8601 datetime format and expressed in Coordinated Universal Time (UTC).
   * @format date-time
   * @example "2022-04-29T08:59:51Z"
   */
  created_at: string;
  /**
   * The date and time that determines when the wallet will expire. It follows the ISO 8601 datetime format and is expressed in Coordinated Universal Time (UTC).
   * @format date-time
   * @example null
   */
  expiration_at?: string | null;
  /**
   * The date and time of the last balance top-up. It follows the ISO 8601 datetime format and is expressed in Coordinated Universal Time (UTC).
   * @format date-time
   * @example "2022-04-29T08:59:51Z"
   */
  last_balance_sync_at?: string | null;
  /**
   * The date and time of the last credits consumption. It follows the ISO 8601 datetime format and is expressed in Coordinated Universal Time (UTC).
   * @format date-time
   * @example "2022-04-29T08:59:51Z"
   */
  last_consumed_credit_at?: string | null;
  /**
   * The date of terminaison of the wallet. It follows the ISO 8601 datetime format and is expressed in Coordinated Universal Time (UTC).
   * @format date-time
   * @example "2022-09-14T16:35:31Z"
   */
  terminated_at?: string | null;
}

export interface WalletsPaginated {
  wallets: WalletObject[];
  meta: PaginationMeta;
}

export interface WalletTransactionCreateInput {
  wallet_transaction: {
    /**
     * Unique identifier assigned to the wallet within the Lago application. This ID is exclusively created by Lago and serves as a unique identifier for the wallet’s record within the Lago system.
     * @format uuid
     * @example "1a901a90-1a90-1a90-1a90-1a901a901a90"
     */
    wallet_id: string;
    /**
     * The number of paid credits. Required only if there is no granted credits.
     * @pattern ^[0-9]+.?[0-9]*$
     * @example "20.0"
     */
    paid_credits?: string;
    /**
     * The number of free granted credits. Required only if there is no paid credits.
     * @pattern ^[0-9]+.?[0-9]*$
     * @example "10.0"
     */
    granted_credits?: string;
  };
}

export interface WalletTransactionObject {
  /**
   * Unique identifier assigned to the wallet transaction within the Lago application. This ID is exclusively created by Lago and serves as a unique identifier for the wallet transaction’s record within the Lago system.
   * @format uuid
   * @example "1a901a90-1a90-1a90-1a90-1a901a901a90"
   */
  lago_id: string;
  /**
   * Unique identifier assigned to the wallet within the Lago application. This ID is exclusively created by Lago and serves as a unique identifier for the wallet’s record within the Lago system.
   * @format uuid
   * @example "1a901a90-1a90-1a90-1a90-1a901a901a90"
   */
  lago_wallet_id: string;
  /**
   * The status of the wallet transaction. Possible values are `pending` or `settled`.
   * @example "settled"
   */
  status: 'pending' | 'settled';
  /**
   * The type of transaction. Possible values are `inbound` (increasing the balance) or `outbound` (decreasing the balance).
   * @example "inbound"
   */
  transaction_type: 'inbound' | 'outbound';
  /**
   * The amount of credits based on the rate and the currency.
   * @pattern ^[0-9]+.?[0-9]*$
   * @example "10.0"
   */
  amount: string;
  /**
   * The number of credits used in the wallet transaction.
   * @pattern ^[0-9]+.?[0-9]*$
   * @example "100.0"
   */
  credit_amount: string;
  /**
   * The date when wallet transaction is settled, represented in ISO 8601 datetime format and expressed in Coordinated Universal Time (UTC).
   * @format date-time
   * @example "2022-04-29T08:59:51Z"
   */
  settled_at?: string;
  /**
   * The date of the wallet transaction creation, represented in ISO 8601 datetime format and expressed in Coordinated Universal Time (UTC).
   * @format date-time
   * @example "2022-04-29T08:59:51Z"
   */
  created_at: string;
}

export interface WalletTransactions {
  wallet_transactions: WalletTransactionObject[];
}

export type WalletTransactionsPaginated = WalletTransactions & {
  meta: PaginationMeta;
};

export interface WalletUpdateInput {
  wallet: {
    /**
     * The name of the wallet.
     * @example "new_name"
     */
    name?: string | null;
    /**
     * The date and time that determines when the wallet will expire. It follows the ISO 8601 datetime format and is expressed in Coordinated Universal Time (UTC).
     * @format date-time
     * @example "2022-07-07T23:59:59Z"
     */
    expiration_at?: string | null;
  };
}

export interface FindAllAddOnsParams {
  /**
   * Page number.
   * @example 1
   */
  page?: number;
  /**
   * Number of records per page.
   * @example 20
   */
  per_page?: number;
}

export interface FindAllAppliedCouponsParams {
  /**
   * Page number.
   * @example 1
   */
  page?: number;
  /**
   * Number of records per page.
   * @example 20
   */
  per_page?: number;
  /**
   * The status of the coupon. Can be either `active` or `terminated`.
   * @example "active"
   */
  status?: 'active' | 'terminated';
  /**
   * The customer external unique identifier (provided by your own application)
   * @example "5eb02857-a71e-4ea2-bcf9-57d3a41bc6ba"
   */
  external_customer_id?: string;
}

export interface FindAllBillableMetricsParams {
  /**
   * Page number.
   * @example 1
   */
  page?: number;
  /**
   * Number of records per page.
   * @example 20
   */
  per_page?: number;
}

export interface FindAllBillableMetricGroupsParams {
  /**
   * Page number.
   * @example 1
   */
  page?: number;
  /**
   * Number of records per page.
   * @example 20
   */
  per_page?: number;
  /**
   * Code of the existing billable metric.
   * @example "example_code"
   */
  code: string;
}

export interface FindAllCouponsParams {
  /**
   * Page number.
   * @example 1
   */
  page?: number;
  /**
   * Number of records per page.
   * @example 20
   */
  per_page?: number;
}

export interface FindAllCreditNotesParams {
  /**
   * Page number.
   * @example 1
   */
  page?: number;
  /**
   * Number of records per page.
   * @example 20
   */
  per_page?: number;
  /**
   * Unique identifier assigned to the customer in your application.
   * @example "5eb02857-a71e-4ea2-bcf9-57d3a41bc6ba"
   */
  external_customer_id?: string;
}

export interface FindAllCustomersParams {
  /**
   * Page number.
   * @example 1
   */
  page?: number;
  /**
   * Number of records per page.
   * @example 20
   */
  per_page?: number;
}

export interface FindCustomerCurrentUsageParams {
  /**
   * The unique identifier of the subscription within your application.
   * @example "sub_1234567890"
   */
  external_subscription_id: string;
  /**
   * The customer external unique identifier (provided by your own application).
   * @example "5eb02857-a71e-4ea2-bcf9-57d3a41bc6ba"
   */
  externalCustomerId: string;
}

export interface FindAllFeesParams {
  /**
   * Page number.
   * @example 1
   */
  page?: number;
  /**
   * Number of records per page.
   * @example 20
   */
  per_page?: number;
  /**
   * Unique identifier assigned to the customer in your application.
   * @example "5eb02857-a71e-4ea2-bcf9-57d3a41bc6ba"
   */
  external_customer_id?: string;
  /**
   * External subscription ID
   * @example "5eb02857-a71e-4ea2-bcf9-57d3a41bc6ba"
   */
  external_subscription_id?: string;
  /** Filter results by fee’s currency. */
  currency?: Currency;
  /**
   * The fee type. Possible values are `add-on`, `charge`, `credit` or `subscription`.
   * @example "charge"
   */
  fee_type?: 'charge' | 'add_on' | 'subscription' | 'credit' | 'instant_charge';
  /**
   * Filter results by the `code` of the billable metric attached to the fee. Only applies to `charge` types.
   * @example "bm_code"
   */
  billable_metric_code?: string;
  /**
   * Indicates the payment status of the fee. It represents the current status of the payment associated with the fee. The possible values for this field are `pending`, `succeeded`, `failed` and refunded`.
   * @example "succeeded"
   */
  payment_status?: 'pending' | 'succeeded' | 'failed' | 'refunded';
  /**
   * Filter results created after creation date and time in UTC.
   * @format date-time
   * @example "2023-03-28T12:21:51Z"
   */
  created_at_from?: string;
  /**
   * Filter results created before creation date and time in UTC.
   * @format date-time
   * @example "2023-03-28T12:21:51Z"
   */
  created_at_to?: string;
  /**
   * Filter results with payment success after creation date and time in UTC.
   * @format date-time
   * @example "2023-03-28T12:21:51Z"
   */
  succeeded_at_from?: string;
  /**
   * Filter results with payment success after creation date and time in UTC.
   * @format date-time
   * @example "2023-03-28T12:21:51Z"
   */
  succeeded_at_to?: string;
  /**
   * Filter results with payment failure after creation date and time in UTC.
   * @format date-time
   * @example "2023-03-28T12:21:51Z"
   */
  failed_at_from?: string;
  /**
   * Filter results with payment failure after creation date and time in UTC.
   * @format date-time
   * @example "2023-03-28T12:21:51Z"
   */
  failed_at_to?: string;
  /**
   * Filter results with payment refund after creation date and time in UTC.
   * @format date-time
   * @example "2023-03-28T12:21:51Z"
   */
  refunded_at_from?: string;
  /**
   * Filter results with payment refund after creation date and time in UTC.
   * @format date-time
   * @example "2023-03-28T12:21:51Z"
   */
  refunded_at_to?: string;
}

export interface FindAllInvoicesParams {
  /**
   * Page number.
   * @example 1
   */
  page?: number;
  /**
   * Number of records per page.
   * @example 20
   */
  per_page?: number;
  /**
   * Unique identifier assigned to the customer in your application.
   * @example "5eb02857-a71e-4ea2-bcf9-57d3a41bc6ba"
   */
  external_customer_id?: string;
  /**
   * Filter invoices starting from a specific date.
   * @format date
   * @example "2022-07-08"
   */
  issuing_date_from?: string;
  /**
   * Filter invoices up to a specific date.
   * @format date
   * @example "2022-08-09"
   */
  issuing_date_to?: string;
  /** Filter invoices by status. Possible values are `draft` or `finalized`. */
  status?: 'draft' | 'finalized';
  /** Filter invoices by payment status. Possible values are `pending`, `failed` or `succeeded`. */
  payment_status?: 'pending' | 'failed' | 'succeeded';
}

export interface FindAllPlansParams {
  /**
   * Page number.
   * @example 1
   */
  page?: number;
  /**
   * Number of records per page.
   * @example 20
   */
  per_page?: number;
}

export interface FindAllSubscriptionsParams {
  /**
   * Page number.
   * @example 1
   */
  page?: number;
  /**
   * Number of records per page.
   * @example 20
   */
  per_page?: number;
  /**
   * The customer external unique identifier (provided by your own application)
   * @example "5eb02857-a71e-4ea2-bcf9-57d3a41bc6ba"
   */
  external_customer_id?: string;
  /**
   * The unique code representing the plan to be attached to the customer. This code must correspond to the code property of one of the active plans.
   * @example "premium"
   */
  plan_code?: string;
  /**
   * If the field is not defined, Lago will return only `active` subscriptions. However, if you wish to fetch subscriptions by different status you can define them in a status[] query param. Available filter values: `pending`, `canceled`, `terminated`, `active`.
   * @example ["active","pending"]
   */
  status?: ('pending' | 'canceled' | 'terminated' | 'active')[];
}

export interface DestroySubscriptionParams {
  /**
   * If the field is not defined, Lago will terminate only `active` subscriptions. However, if you wish to cancel a `pending` subscription, please ensure that you include `status=pending` in your request.
   * @example "pending"
   */
  status?: string;
  /**
   * External ID of the existing subscription
   * @example "5eb02857-a71e-4ea2-bcf9-57d3a41bc6ba"
   */
  externalId: string;
}

export interface FindAllTaxesParams {
  /**
   * Page number.
   * @example 1
   */
  page?: number;
  /**
   * Number of records per page.
   * @example 20
   */
  per_page?: number;
}

export interface FindAllWalletsParams {
  /**
   * Page number.
   * @example 1
   */
  page?: number;
  /**
   * Number of records per page.
   * @example 20
   */
  per_page?: number;
  /**
   * The customer external unique identifier (provided by your own application).
   * @example "5eb02857-a71e-4ea2-bcf9-57d3a41bc6ba"
   */
  external_customer_id: string;
}

export interface FindAllWalletTransactionsParams {
  /**
   * Page number.
   * @example 1
   */
  page?: number;
  /**
   * Number of records per page.
   * @example 20
   */
  per_page?: number;
  /**
   * The status of the wallet transaction. Possible values are `pending` or `settled`.
   * @example "pending"
   */
  status?: string;
  /**
   * The transaction type of the wallet transaction. Possible values are `inbound` (increasing the wallet balance) or `outbound` (decreasing the wallet balance).
   * @example "inbound"
   */
  transaction_type?: string;
  /**
   * Unique identifier assigned to the wallet within the Lago application. This ID is exclusively created by Lago and serves as a unique identifier for the wallet’s record within the Lago system.
   * @format uuid
   * @example "1a901a90-1a90-1a90-1a90-1a901a901a90"
   */
  lagoId: string;
}

export interface CreateWebhookEndpointPayload {
  webhook_endpoint?: {
    /**
     * The URL of the webhook endpoint.
     * @example "https://foo.bar"
     */
    webhook_url: string;
    /**
     * The signature used for the webhook. If no value is passed,
     * @example "hmac"
     */
    signature_algo?: 'jwt' | 'hmac' | null;
  };
}

export interface FindAllWebhookEndpointsParams {
  /**
   * Page number.
   * @example 1
   */
  page?: number;
  /**
   * Number of records per page.
   * @example 20
   */
  per_page?: number;
}

export interface UpdateWebhookEndpointPayload {
  webhook_endpoint?: {
    /**
     * The URL of the webhook endpoint.
     * @example "https://foo.bar"
     */
    webhook_url: string;
    /**
     * The signature used for the webhook. If no value is passed,
     * @example "hmac"
     */
    signature_algo?: 'jwt' | 'hmac' | null;
  };
}

import type { AxiosInstance, AxiosRequestConfig, AxiosResponse, HeadersDefaults, ResponseType } from 'axios';
import axios from 'axios';

export type QueryParamsType = Record<string | number, any>;

export interface FullRequestParams extends Omit<AxiosRequestConfig, 'data' | 'params' | 'url' | 'responseType'> {
  /** set parameter to `true` for call `securityWorker` for this request */
  secure?: boolean;
  /** request path */
  path: string;
  /** content type of request body */
  type?: ContentType;
  /** query params */
  query?: QueryParamsType;
  /** format of response (i.e. response.json() -> format: "json") */
  format?: ResponseType;
  /** request body */
  body?: unknown;
}

export type RequestParams = Omit<FullRequestParams, 'body' | 'method' | 'query' | 'path'>;

export interface ApiConfig<SecurityDataType = unknown> extends Omit<AxiosRequestConfig, 'data' | 'cancelToken'> {
  securityWorker?: (
    securityData: SecurityDataType | null,
  ) => Promise<AxiosRequestConfig | void> | AxiosRequestConfig | void;
  secure?: boolean;
  format?: ResponseType;
}

export enum ContentType {
  Json = 'application/json',
  FormData = 'multipart/form-data',
  UrlEncoded = 'application/x-www-form-urlencoded',
  Text = 'text/plain',
}

export class HttpClient<SecurityDataType = unknown> {
  public instance: AxiosInstance;
  private securityData: SecurityDataType | null = null;
  private securityWorker?: ApiConfig<SecurityDataType>['securityWorker'];
  private secure?: boolean;
  private format?: ResponseType;

  constructor({ securityWorker, secure, format, ...axiosConfig }: ApiConfig<SecurityDataType> = {}) {
    this.instance = axios.create({ ...axiosConfig, baseURL: axiosConfig.baseURL || 'https://api.getlago.com/api/v1' });
    this.secure = secure;
    this.format = format;
    this.securityWorker = securityWorker;
  }

  public setSecurityData = (data: SecurityDataType | null) => {
    this.securityData = data;
  };

  protected mergeRequestParams(params1: AxiosRequestConfig, params2?: AxiosRequestConfig): AxiosRequestConfig {
    const method = params1.method || (params2 && params2.method);

    return {
      ...this.instance.defaults,
      ...params1,
      ...(params2 || {}),
      headers: {
        ...((method && this.instance.defaults.headers[method.toLowerCase() as keyof HeadersDefaults]) || {}),
        ...(params1.headers || {}),
        ...((params2 && params2.headers) || {}),
      },
    };
  }

  protected stringifyFormItem(formItem: unknown) {
    if (typeof formItem === 'object' && formItem !== null) {
      return JSON.stringify(formItem);
    } else {
      return `${formItem}`;
    }
  }

  protected createFormData(input: Record<string, unknown>): FormData {
    return Object.keys(input || {}).reduce((formData, key) => {
      const property = input[key];
      const propertyContent: any[] = property instanceof Array ? property : [property];

      for (const formItem of propertyContent) {
        const isFileType = formItem instanceof Blob || formItem instanceof File;
        formData.append(key, isFileType ? formItem : this.stringifyFormItem(formItem));
      }

      return formData;
    }, new FormData());
  }

  public request = async <T = any, _E = any>({
    secure,
    path,
    type,
    query,
    format,
    body,
    ...params
  }: FullRequestParams): Promise<AxiosResponse<T>> => {
    const secureParams =
      ((typeof secure === 'boolean' ? secure : this.secure) &&
        this.securityWorker &&
        (await this.securityWorker(this.securityData))) ||
      {};
    const requestParams = this.mergeRequestParams(params, secureParams);
    const responseFormat = format || this.format || undefined;

    if (type === ContentType.FormData && body && body !== null && typeof body === 'object') {
      body = this.createFormData(body as Record<string, unknown>);
    }

    if (type === ContentType.Text && body && body !== null && typeof body !== 'string') {
      body = JSON.stringify(body);
    }

    return this.instance.request({
      ...requestParams,
      headers: {
        ...(requestParams.headers || {}),
        ...(type && type !== ContentType.FormData ? { 'Content-Type': type } : {}),
      },
      params: query,
      responseType: responseFormat,
      data: body,
      url: path,
    });
  };
}

/**
 * @title Lago API documentation
 * @version 0.46.1-beta
 * @license AGPLv3
 * @baseUrl https://api.getlago.com/api/v1
 * @externalDocs https://github.com/getlago
 * @contact <tech@getlago.com>
 *
 * Lago API allows your application to push customer information and metrics (events) from your application to the billing application.
 */
export class Api<SecurityDataType extends unknown> extends HttpClient<SecurityDataType> {
  addOns = {
    /**
     * @description This endpoint is used to create an add-on that can be then attached to a one-off invoice.
     *
     * @tags add_ons
     * @name CreateAddOn
     * @summary Create an add-on
     * @request POST:/add_ons
     * @secure
     */
    createAddOn: (data: AddOnCreateInput, params: RequestParams = {}) =>
      this.request<AddOn, ApiErrorBadRequest | ApiErrorUnauthorized | ApiErrorUnprocessableEntity>({
        path: `/add_ons`,
        method: 'POST',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * @description This endpoint is used to list all existing add-ons.
     *
     * @tags add_ons
     * @name FindAllAddOns
     * @summary List all add-ons
     * @request GET:/add_ons
     * @secure
     */
    findAllAddOns: (query: FindAllAddOnsParams, params: RequestParams = {}) =>
      this.request<AddOnsPaginated, ApiErrorUnauthorized>({
        path: `/add_ons`,
        method: 'GET',
        query: query,
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * @description This endpoint is used to update an existing add-on.
     *
     * @tags add_ons
     * @name UpdateAddOn
     * @summary Update an add-on
     * @request PUT:/add_ons/{code}
     * @secure
     */
    updateAddOn: (code: string, data: AddOnUpdateInput, params: RequestParams = {}) =>
      this.request<AddOn, ApiErrorBadRequest | ApiErrorUnauthorized | ApiErrorNotFound | ApiErrorUnprocessableEntity>({
        path: `/add_ons/${code}`,
        method: 'PUT',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * @description This endpoint is used to retrieve a specific add-on.
     *
     * @tags add_ons
     * @name FindAddOn
     * @summary Retrieve an add-on
     * @request GET:/add_ons/{code}
     * @secure
     */
    findAddOn: (code: string, params: RequestParams = {}) =>
      this.request<AddOn, ApiErrorUnauthorized | ApiErrorNotFound>({
        path: `/add_ons/${code}`,
        method: 'GET',
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * @description This endpoint is used to delete an existing add-on.
     *
     * @tags add_ons
     * @name DestroyAddOn
     * @summary Delete an add-on
     * @request DELETE:/add_ons/{code}
     * @secure
     */
    destroyAddOn: (code: string, params: RequestParams = {}) =>
      this.request<AddOn, ApiErrorUnauthorized | ApiErrorNotFound>({
        path: `/add_ons/${code}`,
        method: 'DELETE',
        secure: true,
        format: 'json',
        ...params,
      }),
  };
  appliedCoupons = {
    /**
     * @description This endpoint is used to apply a specific coupon to a customer, before or during a subscription.
     *
     * @tags coupons
     * @name ApplyCoupon
     * @summary Apply a coupon to a customer
     * @request POST:/applied_coupons
     * @secure
     */
    applyCoupon: (data: AppliedCouponInput, params: RequestParams = {}) =>
      this.request<
        AppliedCoupon,
        ApiErrorBadRequest | ApiErrorUnauthorized | ApiErrorNotFound | ApiErrorUnprocessableEntity
      >({
        path: `/applied_coupons`,
        method: 'POST',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * @description This endpoint is used to list all applied coupons. You can filter by coupon status and by customer.
     *
     * @tags coupons
     * @name FindAllAppliedCoupons
     * @summary List all applied coupons
     * @request GET:/applied_coupons
     * @secure
     */
    findAllAppliedCoupons: (query: FindAllAppliedCouponsParams, params: RequestParams = {}) =>
      this.request<AppliedCouponsPaginated, ApiErrorUnauthorized>({
        path: `/applied_coupons`,
        method: 'GET',
        query: query,
        secure: true,
        format: 'json',
        ...params,
      }),
  };
  billableMetrics = {
    /**
     * @description This endpoint creates a new billable metric representing a pricing component of your application.
     *
     * @tags billable_metrics
     * @name CreateBillableMetric
     * @summary Create a billable metric
     * @request POST:/billable_metrics
     * @secure
     */
    createBillableMetric: (data: BillableMetricCreateInput, params: RequestParams = {}) =>
      this.request<BillableMetric, ApiErrorBadRequest | ApiErrorUnauthorized | ApiErrorUnprocessableEntity>({
        path: `/billable_metrics`,
        method: 'POST',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * @description This endpoint retrieves all existing billable metrics that represent pricing components of your application.
     *
     * @tags billable_metrics
     * @name FindAllBillableMetrics
     * @summary List all billable metrics
     * @request GET:/billable_metrics
     * @secure
     */
    findAllBillableMetrics: (query: FindAllBillableMetricsParams, params: RequestParams = {}) =>
      this.request<BillableMetricsPaginated, ApiErrorUnauthorized>({
        path: `/billable_metrics`,
        method: 'GET',
        query: query,
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * @description This endpoint updates an existing billable metric representing a pricing component of your application.
     *
     * @tags billable_metrics
     * @name UpdateBillableMetric
     * @summary Update a billable metric
     * @request PUT:/billable_metrics/{code}
     * @secure
     */
    updateBillableMetric: (code: string, data: BillableMetricUpdateInput, params: RequestParams = {}) =>
      this.request<
        BillableMetric,
        ApiErrorBadRequest | ApiErrorUnauthorized | ApiErrorNotFound | ApiErrorUnprocessableEntity
      >({
        path: `/billable_metrics/${code}`,
        method: 'PUT',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * @description This endpoint deletes an existing billable metric representing a pricing component of your application.
     *
     * @tags billable_metrics
     * @name DestroyBillableMetric
     * @summary Delete a billable metric
     * @request DELETE:/billable_metrics/{code}
     * @secure
     */
    destroyBillableMetric: (code: string, params: RequestParams = {}) =>
      this.request<BillableMetric, ApiErrorUnauthorized | ApiErrorNotFound>({
        path: `/billable_metrics/${code}`,
        method: 'DELETE',
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * @description This endpoint retrieves an existing billable metric that represents a pricing component of your application. The billable metric is identified by its unique code.
     *
     * @tags billable_metrics
     * @name FindBillableMetric
     * @summary Retrieve a billable metric
     * @request GET:/billable_metrics/{code}
     * @secure
     */
    findBillableMetric: (code: string, params: RequestParams = {}) =>
      this.request<BillableMetric, ApiErrorUnauthorized | ApiErrorNotFound>({
        path: `/billable_metrics/${code}`,
        method: 'GET',
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * @description This endpoint retrieves all groups for a billable metric.
     *
     * @tags billable_metrics
     * @name FindAllBillableMetricGroups
     * @summary Find a billable metric's groups
     * @request GET:/billable_metrics/{code}/groups
     * @secure
     */
    findAllBillableMetricGroups: ({ code, ...query }: FindAllBillableMetricGroupsParams, params: RequestParams = {}) =>
      this.request<GroupsPaginated, ApiErrorUnauthorized>({
        path: `/billable_metrics/${code}/groups`,
        method: 'GET',
        query: query,
        secure: true,
        format: 'json',
        ...params,
      }),
  };
  coupons = {
    /**
     * @description This endpoint is used to create a coupon that can be then attached to a customer to create a discount.
     *
     * @tags coupons
     * @name CreateCoupon
     * @summary Create a coupon
     * @request POST:/coupons
     * @secure
     */
    createCoupon: (data: CouponCreateInput, params: RequestParams = {}) =>
      this.request<Coupon, ApiErrorBadRequest | ApiErrorUnauthorized | ApiErrorUnprocessableEntity>({
        path: `/coupons`,
        method: 'POST',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * @description This endpoint is used to list all existing coupons.
     *
     * @tags coupons
     * @name FindAllCoupons
     * @summary List all coupons
     * @request GET:/coupons
     * @secure
     */
    findAllCoupons: (query: FindAllCouponsParams, params: RequestParams = {}) =>
      this.request<CouponsPaginated, ApiErrorUnauthorized>({
        path: `/coupons`,
        method: 'GET',
        query: query,
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * @description This endpoint is used to update a coupon that can be then attached to a customer to create a discount.
     *
     * @tags coupons
     * @name UpdateCoupon
     * @summary Update a coupon
     * @request PUT:/coupons/{code}
     * @secure
     */
    updateCoupon: (code: string, data: CouponUpdateInput, params: RequestParams = {}) =>
      this.request<Coupon, ApiErrorBadRequest | ApiErrorUnauthorized | ApiErrorNotFound | ApiErrorUnprocessableEntity>({
        path: `/coupons/${code}`,
        method: 'PUT',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * @description This endpoint is used to retrieve a specific coupon.
     *
     * @tags coupons
     * @name FindCoupon
     * @summary Retrieve a coupon
     * @request GET:/coupons/{code}
     * @secure
     */
    findCoupon: (code: string, params: RequestParams = {}) =>
      this.request<Coupon, ApiErrorUnauthorized | ApiErrorNotFound>({
        path: `/coupons/${code}`,
        method: 'GET',
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * @description This endpoint is used to delete a coupon.
     *
     * @tags coupons
     * @name DestroyCoupon
     * @summary Delete a coupon
     * @request DELETE:/coupons/{code}
     * @secure
     */
    destroyCoupon: (code: string, params: RequestParams = {}) =>
      this.request<Coupon, ApiErrorUnauthorized | ApiErrorNotFound>({
        path: `/coupons/${code}`,
        method: 'DELETE',
        secure: true,
        format: 'json',
        ...params,
      }),
  };
  creditNotes = {
    /**
     * @description This endpoint creates a new credit note.
     *
     * @tags credit_notes
     * @name CreateCreditNote
     * @summary Create a credit note
     * @request POST:/credit_notes
     * @secure
     */
    createCreditNote: (data: CreditNoteCreateInput, params: RequestParams = {}) =>
      this.request<CreditNote, ApiErrorBadRequest | ApiErrorUnauthorized | ApiErrorUnprocessableEntity>({
        path: `/credit_notes`,
        method: 'POST',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * @description This endpoint list all existing credit notes.
     *
     * @tags credit_notes
     * @name FindAllCreditNotes
     * @summary List all credit notes
     * @request GET:/credit_notes
     * @secure
     */
    findAllCreditNotes: (query: FindAllCreditNotesParams, params: RequestParams = {}) =>
      this.request<CreditNotes, ApiErrorUnauthorized>({
        path: `/credit_notes`,
        method: 'GET',
        query: query,
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * @description This endpoint updates an existing credit note.
     *
     * @tags credit_notes
     * @name UpdateCreditNote
     * @summary Update a credit note
     * @request PUT:/credit_notes/{lago_id}
     * @secure
     */
    updateCreditNote: (lagoId: string, data: CreditNoteUpdateInput, params: RequestParams = {}) =>
      this.request<
        CreditNote,
        ApiErrorBadRequest | ApiErrorUnauthorized | ApiErrorNotFound | ApiErrorUnprocessableEntity
      >({
        path: `/credit_notes/${lagoId}`,
        method: 'PUT',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * @description This endpoint retrieves an existing credit note.
     *
     * @tags credit_notes
     * @name FindCreditNote
     * @summary Retrieve a credit note
     * @request GET:/credit_notes/{lago_id}
     * @secure
     */
    findCreditNote: (lagoId: string, params: RequestParams = {}) =>
      this.request<CreditNote, ApiErrorUnauthorized | ApiErrorNotFound>({
        path: `/credit_notes/${lagoId}`,
        method: 'GET',
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * @description This endpoint downloads the PDF of an existing credit note.
     *
     * @tags credit_notes
     * @name DownloadCreditNote
     * @summary Download a credit note PDF
     * @request POST:/credit_notes/{lago_id}/download
     * @secure
     */
    downloadCreditNote: (lagoId: string, params: RequestParams = {}) =>
      this.request<CreditNote, ApiErrorUnauthorized | ApiErrorNotFound>({
        path: `/credit_notes/${lagoId}/download`,
        method: 'POST',
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * @description This endpoint voids an existing credit note.
     *
     * @tags credit_notes
     * @name VoidCreditNote
     * @summary Void a credit note
     * @request PUT:/credit_notes/{lago_id}/void
     * @secure
     */
    voidCreditNote: (lagoId: string, params: RequestParams = {}) =>
      this.request<CreditNote, ApiErrorUnauthorized | ApiErrorNotFound | ApiErrorNotAllowed>({
        path: `/credit_notes/${lagoId}/void`,
        method: 'PUT',
        secure: true,
        format: 'json',
        ...params,
      }),
  };
  customers = {
    /**
     * @description This endpoint creates a new customer.
     *
     * @tags customers
     * @name CreateCustomer
     * @summary Create a customer
     * @request POST:/customers
     * @secure
     */
    createCustomer: (data: CustomerCreateInput, params: RequestParams = {}) =>
      this.request<Customer, ApiErrorBadRequest | ApiErrorUnauthorized | ApiErrorUnprocessableEntity>({
        path: `/customers`,
        method: 'POST',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * @description This endpoint retrieves all existing customers.
     *
     * @tags customers
     * @name FindAllCustomers
     * @summary List all customers
     * @request GET:/customers
     * @secure
     */
    findAllCustomers: (query: FindAllCustomersParams, params: RequestParams = {}) =>
      this.request<CustomersPaginated, ApiErrorUnauthorized>({
        path: `/customers`,
        method: 'GET',
        query: query,
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * @description This endpoint retrieves an existing customer.
     *
     * @tags customers
     * @name FindCustomer
     * @summary Retrieve a customer
     * @request GET:/customers/{external_id}
     * @secure
     */
    findCustomer: (externalId: string, params: RequestParams = {}) =>
      this.request<Customer, ApiErrorUnauthorized | ApiErrorNotFound>({
        path: `/customers/${externalId}`,
        method: 'GET',
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * @description This endpoint deletes an existing customer.
     *
     * @tags customers
     * @name DestroyCustomer
     * @summary Delete a customer
     * @request DELETE:/customers/{external_id}
     * @secure
     */
    destroyCustomer: (externalId: string, params: RequestParams = {}) =>
      this.request<Customer, ApiErrorUnauthorized | ApiErrorNotFound>({
        path: `/customers/${externalId}`,
        method: 'DELETE',
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * @description This endpoint is used to delete a specific coupon that has been applied to a customer.
     *
     * @tags coupons, customers
     * @name DeleteAppliedCoupon
     * @summary Delete an applied coupon
     * @request DELETE:/customers/{external_customer_id}/applied_coupons/{applied_coupon_id}
     * @secure
     */
    deleteAppliedCoupon: (externalCustomerId: string, appliedCouponId: string, params: RequestParams = {}) =>
      this.request<AppliedCoupon, ApiErrorUnauthorized | ApiErrorNotFound>({
        path: `/customers/${externalCustomerId}/applied_coupons/${appliedCouponId}`,
        method: 'DELETE',
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * @description Retrieves an embeddable link for displaying a customer portal. This endpoint allows you to fetch the URL that can be embedded to provide customers access to a dedicated portal
     *
     * @tags customers
     * @name GetCustomerPortalUrl
     * @summary Get a customer portal URL
     * @request GET:/customers/{external_customer_id}/portal_url
     * @secure
     */
    getCustomerPortalUrl: (externalCustomerId: string, params: RequestParams = {}) =>
      this.request<
        {
          customer: {
            /**
             * An embeddable link for displaying a customer portal
             * @example "https://app.lago.com/customer-portal/1234567890"
             */
            portal_url: string;
          };
        },
        ApiErrorUnauthorized | ApiErrorForbidden | ApiErrorNotFound
      >({
        path: `/customers/${externalCustomerId}/portal_url`,
        method: 'GET',
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * @description This endpoint enables the retrieval of the usage-based billing data for a customer within the current period.
     *
     * @tags customers
     * @name FindCustomerCurrentUsage
     * @summary Retrieve customer current usage
     * @request GET:/customers/{external_customer_id}/current_usage
     * @secure
     */
    findCustomerCurrentUsage: (
      { externalCustomerId, ...query }: FindCustomerCurrentUsageParams,
      params: RequestParams = {},
    ) =>
      this.request<CustomerUsage, ApiErrorUnauthorized | ApiErrorNotFound>({
        path: `/customers/${externalCustomerId}/current_usage`,
        method: 'GET',
        query: query,
        secure: true,
        format: 'json',
        ...params,
      }),
  };
  events = {
    /**
     * @description This endpoint is used for transmitting usage measurement events to either a designated customer or a specific subscription.
     *
     * @tags events
     * @name CreateEvent
     * @summary Send usage events
     * @request POST:/events
     * @secure
     */
    createEvent: (data: EventInput, params: RequestParams = {}) =>
      this.request<void, ApiErrorBadRequest | ApiErrorUnauthorized | ApiErrorUnprocessableEntity>({
        path: `/events`,
        method: 'POST',
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * @description This endpoint is used for transmitting a batch of usage measurement events to multiple subscriptions for a single customer.
     *
     * @tags events
     * @name CreateBatchEvents
     * @summary Batch multiple events
     * @request POST:/events/batch
     * @secure
     */
    createBatchEvents: (data: EventBatchInput, params: RequestParams = {}) =>
      this.request<void, ApiErrorBadRequest | ApiErrorUnauthorized | ApiErrorUnprocessableEntity>({
        path: `/events/batch`,
        method: 'POST',
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * @description Estimate the fees that would be created after reception of an event for a billable metric attached to one or multiple pay in advance charges
     *
     * @tags events
     * @name EventEstimateFees
     * @summary Estimate fees for a pay in advance charge
     * @request POST:/events/estimate_fees
     * @secure
     */
    eventEstimateFees: (data: EventEstimateFeesInput, params: RequestParams = {}) =>
      this.request<Fees, ApiErrorBadRequest | ApiErrorUnauthorized | ApiErrorNotFound | ApiErrorUnprocessableEntity>({
        path: `/events/estimate_fees`,
        method: 'POST',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * @description This endpoint is used for retrieving a specific usage measurement event that has been sent to a customer or a subscription.
     *
     * @tags events
     * @name FindEvent
     * @summary Retrieve a specific event
     * @request GET:/events/{transaction_id}
     * @secure
     */
    findEvent: (transactionId: string, params: RequestParams = {}) =>
      this.request<Event, ApiErrorUnauthorized | ApiErrorNotFound>({
        path: `/events/${transactionId}`,
        method: 'GET',
        secure: true,
        format: 'json',
        ...params,
      }),
  };
  fees = {
    /**
     * @description This endpoint is used for retrieving all fees that has been issued.
     *
     * @tags fees
     * @name FindAllFees
     * @summary List all fees
     * @request GET:/fees
     * @secure
     */
    findAllFees: (query: FindAllFeesParams, params: RequestParams = {}) =>
      this.request<FeesPaginated, ApiErrorUnauthorized | ApiErrorUnprocessableEntity>({
        path: `/fees`,
        method: 'GET',
        query: query,
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * @description This endpoint is used for retrieving a specific fee that has been issued.
     *
     * @tags fees
     * @name FindFee
     * @summary Retrieve a specific fee
     * @request GET:/fees/{lago_id}
     * @secure
     */
    findFee: (lagoId: string, params: RequestParams = {}) =>
      this.request<Fee, ApiErrorUnauthorized | ApiErrorNotFound>({
        path: `/fees/${lagoId}`,
        method: 'GET',
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * @description This endpoint is used for updating a specific fee that has been issued.
     *
     * @tags fees
     * @name UpdateFee
     * @summary Update a fee
     * @request PUT:/fees/{lago_id}
     * @secure
     */
    updateFee: (lagoId: string, data: FeeUpdateInput, params: RequestParams = {}) =>
      this.request<Fee, ApiErrorBadRequest | ApiErrorUnauthorized | ApiErrorNotFound | ApiErrorUnprocessableEntity>({
        path: `/fees/${lagoId}`,
        method: 'PUT',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),
  };
  invoices = {
    /**
     * @description This endpoint is used for issuing a one-off invoice.
     *
     * @tags invoices
     * @name CreateInvoice
     * @summary Create a one-off invoice
     * @request POST:/invoices
     * @secure
     */
    createInvoice: (data: InvoiceOneOffCreateInput, params: RequestParams = {}) =>
      this.request<Invoice, ApiErrorBadRequest | ApiErrorUnauthorized | ApiErrorUnprocessableEntity>({
        path: `/invoices`,
        method: 'POST',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * @description This endpoint is used for retrievign all invoices.
     *
     * @tags invoices
     * @name FindAllInvoices
     * @summary List all invoices
     * @request GET:/invoices
     * @secure
     */
    findAllInvoices: (query: FindAllInvoicesParams, params: RequestParams = {}) =>
      this.request<InvoicesPaginated, ApiErrorUnauthorized>({
        path: `/invoices`,
        method: 'GET',
        query: query,
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * @description This endpoint is used for updating an existing invoice.
     *
     * @tags invoices
     * @name UpdateInvoice
     * @summary Update an invoice
     * @request PUT:/invoices/{lago_id}
     * @secure
     */
    updateInvoice: (lagoId: string, data: InvoiceUpdateInput, params: RequestParams = {}) =>
      this.request<Invoice, ApiErrorBadRequest | ApiErrorUnauthorized | ApiErrorNotFound | ApiErrorUnprocessableEntity>(
        {
          path: `/invoices/${lagoId}`,
          method: 'PUT',
          body: data,
          secure: true,
          type: ContentType.Json,
          format: 'json',
          ...params,
        },
      ),

    /**
     * @description This endpoint is used for retrieving a specific invoice that has been issued.
     *
     * @tags invoices
     * @name FindInvoice
     * @summary Retrieve an invoice
     * @request GET:/invoices/{lago_id}
     * @secure
     */
    findInvoice: (lagoId: string, params: RequestParams = {}) =>
      this.request<Invoice, ApiErrorUnauthorized | ApiErrorNotFound>({
        path: `/invoices/${lagoId}`,
        method: 'GET',
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * @description This endpoint is used for downloading a specific invoice PDF document.
     *
     * @tags invoices
     * @name DownloadInvoice
     * @summary Download an invoice PDF
     * @request POST:/invoices/{lago_id}/download
     * @secure
     */
    downloadInvoice: (lagoId: string, params: RequestParams = {}) =>
      this.request<Invoice, ApiErrorUnauthorized | ApiErrorNotFound>({
        path: `/invoices/${lagoId}/download`,
        method: 'POST',
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * @description This endpoint is used for finalizing a draft invoice.
     *
     * @tags invoices
     * @name FinalizeInvoice
     * @summary Finalize a draft invoice
     * @request PUT:/invoices/{lago_id}/finalize
     * @secure
     */
    finalizeInvoice: (lagoId: string, params: RequestParams = {}) =>
      this.request<Invoice, ApiErrorUnauthorized | ApiErrorNotFound>({
        path: `/invoices/${lagoId}/finalize`,
        method: 'PUT',
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * @description This endpoint is used for refreshing a draft invoice.
     *
     * @tags invoices
     * @name RefreshInvoice
     * @summary Refresh a draft invoice
     * @request PUT:/invoices/{lago_id}/refresh
     * @secure
     */
    refreshInvoice: (lagoId: string, params: RequestParams = {}) =>
      this.request<Invoice, ApiErrorUnauthorized | ApiErrorNotFound>({
        path: `/invoices/${lagoId}/refresh`,
        method: 'PUT',
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * @description This endpoint resends an invoice for collection and retry a payment.
     *
     * @tags invoices
     * @name RetryPayment
     * @summary Retry an invoice payment
     * @request POST:/invoices/{lago_id}/retry_payment
     * @secure
     */
    retryPayment: (lagoId: string, params: RequestParams = {}) =>
      this.request<void, ApiErrorUnauthorized | ApiErrorNotFound | ApiErrorNotAllowed>({
        path: `/invoices/${lagoId}/retry_payment`,
        method: 'POST',
        secure: true,
        ...params,
      }),
  };
  organizations = {
    /**
     * @description This endpoint is used to update your own organization's settings.
     *
     * @tags organizations
     * @name UpdateOrganization
     * @summary Update your organization
     * @request PUT:/organizations
     * @secure
     */
    updateOrganization: (data: OrganizationUpdateInput, params: RequestParams = {}) =>
      this.request<Organization, ApiErrorBadRequest | ApiErrorUnauthorized | ApiErrorUnprocessableEntity>({
        path: `/organizations`,
        method: 'PUT',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),
  };
  plans = {
    /**
     * @description This endpoint creates a plan with subscription and usage-based charges. It supports flexible billing cadence (in-advance or in-arrears) and allows for both recurring and metered charges.
     *
     * @tags plans
     * @name CreatePlan
     * @summary Create a plan
     * @request POST:/plans
     * @secure
     */
    createPlan: (data: PlanCreateInput, params: RequestParams = {}) =>
      this.request<Plan, ApiErrorBadRequest | ApiErrorUnauthorized | ApiErrorNotFound | ApiErrorUnprocessableEntity>({
        path: `/plans`,
        method: 'POST',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * @description This endpoint retrieves all existing plans.
     *
     * @tags plans
     * @name FindAllPlans
     * @summary List all plans
     * @request GET:/plans
     * @secure
     */
    findAllPlans: (query: FindAllPlansParams, params: RequestParams = {}) =>
      this.request<PlansPaginated, ApiErrorUnauthorized>({
        path: `/plans`,
        method: 'GET',
        query: query,
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * @description This endpoint updates a specific plan with subscription and usage-based charges. It supports flexible billing cadence (in-advance or in-arrears) and allows for both recurring and metered charges.
     *
     * @tags plans
     * @name UpdatePlan
     * @summary Update a plan
     * @request PUT:/plans/{code}
     * @secure
     */
    updatePlan: (code: string, data: PlanUpdateInput, params: RequestParams = {}) =>
      this.request<Plan, ApiErrorBadRequest | ApiErrorUnauthorized | ApiErrorNotFound | ApiErrorUnprocessableEntity>({
        path: `/plans/${code}`,
        method: 'PUT',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * @description This endpoint retrieves a specific plan.
     *
     * @tags plans
     * @name FindPlan
     * @summary Retrieve a plan
     * @request GET:/plans/{code}
     * @secure
     */
    findPlan: (code: string, params: RequestParams = {}) =>
      this.request<Plan, ApiErrorUnauthorized | ApiErrorNotFound>({
        path: `/plans/${code}`,
        method: 'GET',
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * @description This endpoint deletes a specific plan. Note that this plan could be associated with active subscriptions.
     *
     * @tags plans
     * @name DestroyPlan
     * @summary Delete a plan
     * @request DELETE:/plans/{code}
     * @secure
     */
    destroyPlan: (code: string, params: RequestParams = {}) =>
      this.request<Plan, ApiErrorUnauthorized | ApiErrorNotFound>({
        path: `/plans/${code}`,
        method: 'DELETE',
        secure: true,
        format: 'json',
        ...params,
      }),
  };
  subscriptions = {
    /**
     * @description This endpoint assigns a plan to a customer, creating or modifying a subscription. Ideal for initial subscriptions or plan changes (upgrades/downgrades).
     *
     * @tags subscriptions
     * @name CreateSubscription
     * @summary Assign a plan to a customer
     * @request POST:/subscriptions
     * @secure
     */
    createSubscription: (data: SubscriptionCreateInput, params: RequestParams = {}) =>
      this.request<
        Subscription,
        ApiErrorBadRequest | ApiErrorUnauthorized | ApiErrorNotFound | ApiErrorUnprocessableEntity
      >({
        path: `/subscriptions`,
        method: 'POST',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * @description This endpoint retrieves all active subscriptions.
     *
     * @tags subscriptions
     * @name FindAllSubscriptions
     * @summary List all subscriptions
     * @request GET:/subscriptions
     * @secure
     */
    findAllSubscriptions: (query: FindAllSubscriptionsParams, params: RequestParams = {}) =>
      this.request<SubscriptionsPaginated, ApiErrorUnauthorized | ApiErrorNotFound>({
        path: `/subscriptions`,
        method: 'GET',
        query: query,
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * @description This endpoint allows you to update a subscription.
     *
     * @tags subscriptions
     * @name UpdateSubscription
     * @summary Update a subscription
     * @request PUT:/subscriptions/{external_id}
     * @secure
     */
    updateSubscription: (externalId: string, data: SubscriptionUpdateInput, params: RequestParams = {}) =>
      this.request<
        Subscription,
        ApiErrorBadRequest | ApiErrorUnauthorized | ApiErrorNotFound | ApiErrorUnprocessableEntity
      >({
        path: `/subscriptions/${externalId}`,
        method: 'PUT',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * @description This endpoint allows you to terminate a subscription.
     *
     * @tags subscriptions
     * @name DestroySubscription
     * @summary Terminate a subscription
     * @request DELETE:/subscriptions/{external_id}
     * @secure
     */
    destroySubscription: ({ externalId, ...query }: DestroySubscriptionParams, params: RequestParams = {}) =>
      this.request<Subscription, ApiErrorUnauthorized | ApiErrorNotFound | ApiErrorNotAllowed>({
        path: `/subscriptions/${externalId}`,
        method: 'DELETE',
        query: query,
        secure: true,
        format: 'json',
        ...params,
      }),
  };
  taxes = {
    /**
     * @description This endpoint creates a new tax representing a customizable tax rate applicable to either the organization or a specific customer.
     *
     * @tags taxes
     * @name CreateTax
     * @summary Create a tax
     * @request POST:/taxes
     * @secure
     */
    createTax: (data: TaxCreateInput, params: RequestParams = {}) =>
      this.request<Tax, ApiErrorBadRequest | ApiErrorUnauthorized | ApiErrorUnprocessableEntity>({
        path: `/taxes`,
        method: 'POST',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * @description This endpoint retrieves all existing taxes representing a customizable tax rate applicable to either the organization or a specific customer.
     *
     * @tags taxes
     * @name FindAllTaxes
     * @summary List all taxes
     * @request GET:/taxes
     * @secure
     */
    findAllTaxes: (query: FindAllTaxesParams, params: RequestParams = {}) =>
      this.request<TaxesPaginated, ApiErrorUnauthorized>({
        path: `/taxes`,
        method: 'GET',
        query: query,
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * @description This endpoint updates an existing tax representing a customizable tax rate applicable to either the organization or a specific customer.
     *
     * @tags taxes
     * @name UpdateTax
     * @summary Update a tax
     * @request PUT:/taxes/{code}
     * @secure
     */
    updateTax: (code: string, data: TaxUpdateInput, params: RequestParams = {}) =>
      this.request<Tax, ApiErrorBadRequest | ApiErrorUnauthorized | ApiErrorNotFound | ApiErrorUnprocessableEntity>({
        path: `/taxes/${code}`,
        method: 'PUT',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * @description This endpoint retrieves an existing tax representing a customizable tax rate applicable to either the organization or a specific customer. The tax is identified by its unique code.
     *
     * @tags taxes
     * @name FindTax
     * @summary Retrieve a Tax
     * @request GET:/taxes/{code}
     * @secure
     */
    findTax: (code: string, params: RequestParams = {}) =>
      this.request<Tax, ApiErrorUnauthorized | ApiErrorNotFound>({
        path: `/taxes/${code}`,
        method: 'GET',
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * @description This endpoint is used to delete a tax.
     *
     * @tags taxes
     * @name DestroyTax
     * @summary Delete a tax
     * @request DELETE:/taxes/{code}
     * @secure
     */
    destroyTax: (code: string, params: RequestParams = {}) =>
      this.request<Tax, ApiErrorUnauthorized | ApiErrorNotFound>({
        path: `/taxes/${code}`,
        method: 'DELETE',
        secure: true,
        format: 'json',
        ...params,
      }),
  };
  wallets = {
    /**
     * @description This endpoint is used to create a wallet with prepaid credits.
     *
     * @tags wallets
     * @name CreateWallet
     * @summary Create a wallet
     * @request POST:/wallets
     * @secure
     */
    createWallet: (data: WalletCreateInput, params: RequestParams = {}) =>
      this.request<Wallet, ApiErrorBadRequest | ApiErrorUnauthorized | ApiErrorUnprocessableEntity>({
        path: `/wallets`,
        method: 'POST',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * @description This endpoint is used to list all wallets with prepaid credits.
     *
     * @tags wallets
     * @name FindAllWallets
     * @summary List all wallets
     * @request GET:/wallets
     * @secure
     */
    findAllWallets: (query: FindAllWalletsParams, params: RequestParams = {}) =>
      this.request<WalletsPaginated, ApiErrorUnauthorized>({
        path: `/wallets`,
        method: 'GET',
        query: query,
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * @description This endpoint is used to update an existing wallet with prepaid credits.
     *
     * @tags wallets
     * @name UpdateWallet
     * @summary Update a wallet
     * @request PUT:/wallets/{lago_id}
     * @secure
     */
    updateWallet: (lagoId: string, data: WalletUpdateInput, params: RequestParams = {}) =>
      this.request<Wallet, ApiErrorBadRequest | ApiErrorUnauthorized | ApiErrorNotFound | ApiErrorUnprocessableEntity>({
        path: `/wallets/${lagoId}`,
        method: 'PUT',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * @description This endpoint is used to retrieve an existing wallet with prepaid credits.
     *
     * @tags wallets
     * @name FindWallet
     * @summary Retrieve a wallet
     * @request GET:/wallets/{lago_id}
     * @secure
     */
    findWallet: (lagoId: string, params: RequestParams = {}) =>
      this.request<Wallet, ApiErrorUnauthorized | ApiErrorNotFound>({
        path: `/wallets/${lagoId}`,
        method: 'GET',
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * @description This endpoint is used to terminate an existing wallet with prepaid credits.
     *
     * @tags wallets
     * @name DestroyWallet
     * @summary Terminate a wallet
     * @request DELETE:/wallets/{lago_id}
     * @secure
     */
    destroyWallet: (lagoId: string, params: RequestParams = {}) =>
      this.request<Wallet, ApiErrorUnauthorized | ApiErrorNotFound | ApiErrorNotAllowed>({
        path: `/wallets/${lagoId}`,
        method: 'DELETE',
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * @description This endpoint is used to list all wallet transactions.
     *
     * @tags wallets
     * @name FindAllWalletTransactions
     * @summary List all wallet transactions
     * @request GET:/wallets/{lago_id}/wallet_transactions
     * @secure
     */
    findAllWalletTransactions: ({ lagoId, ...query }: FindAllWalletTransactionsParams, params: RequestParams = {}) =>
      this.request<WalletTransactionsPaginated, ApiErrorUnauthorized | ApiErrorNotFound>({
        path: `/wallets/${lagoId}/wallet_transactions`,
        method: 'GET',
        query: query,
        secure: true,
        format: 'json',
        ...params,
      }),
  };
  walletTransactions = {
    /**
     * @description This endpoint is used to top-up an active wallet.
     *
     * @tags wallets
     * @name CreateWalletTransaction
     * @summary Top up a wallet
     * @request POST:/wallet_transactions
     * @secure
     */
    createWalletTransaction: (data: WalletTransactionCreateInput, params: RequestParams = {}) =>
      this.request<WalletTransactions, ApiErrorBadRequest | ApiErrorUnauthorized | ApiErrorUnprocessableEntity>({
        path: `/wallet_transactions`,
        method: 'POST',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),
  };
  webhooks = {
    /**
     * @description This endpoint is used to retrieve the public key used to verify the webhooks signature
     *
     * @tags webhooks
     * @name FetchPublicKey
     * @summary Retrieve webhook public key
     * @request GET:/webhooks/public_key
     * @secure
     */
    fetchPublicKey: (params: RequestParams = {}) =>
      this.request<string, ApiErrorUnauthorized>({
        path: `/webhooks/public_key`,
        method: 'GET',
        secure: true,
        ...params,
      }),
  };
  webhookEndpoints = {
    /**
     * @description This endpoint is used to create a webhook endpoint.
     *
     * @tags webhook_endpoints
     * @name CreateWebhookEndpoint
     * @summary Create a webhook_endpoint
     * @request POST:/webhook_endpoints
     * @secure
     */
    createWebhookEndpoint: (data: CreateWebhookEndpointPayload, params: RequestParams = {}) =>
      this.request<
        {
          webhook_endpoint: {
            /**
             * Unique identifier assigned to the wallet within the Lago application. This ID is exclusively created by Lago and serves as a unique identifier for the webhook endpoint's record within the Lago system.
             * @format uuid
             * @example "1a901a90-1a90-1a90-1a90-1a901a901a90"
             */
            lago_id: string;
            /**
             * Unique identifier assigned to the organization attached to the webhook endpoint within the Lago application. This ID is exclusively created by Lago and serves as a unique identifier for the organization’s record within the Lago system.
             * @format uuid
             * @example "1a901a90-1a90-1a90-1a90-1a901a901a90"
             */
            lago_organization_id: string;
            /**
             * The name of the wallet.
             * @example "Prepaid"
             */
            webhook_url: string;
            /**
             * The signature algo for the webhook.
             * @example "hmac"
             */
            signature_algo?: 'jwt' | 'hmac';
            /**
             * The date of the webhook endpoint creation, represented in ISO 8601 datetime format and expressed in Coordinated Universal Time (UTC).
             * @format date-time
             * @example "2022-04-29T08:59:51Z"
             */
            created_at: string;
          };
        },
        ApiErrorBadRequest | ApiErrorUnauthorized | ApiErrorUnprocessableEntity
      >({
        path: `/webhook_endpoints`,
        method: 'POST',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * @description This endpoint is used to list all webhook endpoints.
     *
     * @tags webhook_endpoints
     * @name FindAllWebhookEndpoints
     * @summary List all webhook endpoints
     * @request GET:/webhook_endpoints
     * @secure
     */
    findAllWebhookEndpoints: (query: FindAllWebhookEndpointsParams, params: RequestParams = {}) =>
      this.request<
        {
          webhook_endpoints: any[];
          meta: PaginationMeta;
        },
        ApiErrorUnauthorized
      >({
        path: `/webhook_endpoints`,
        method: 'GET',
        query: query,
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * @description This endpoint is used to update an existing webhook endpoint.
     *
     * @tags webhook_endpoints
     * @name UpdateWebhookEndpoint
     * @summary Update a webhook endpoint
     * @request PUT:/webhook_endpoints/{lago_id}
     * @secure
     */
    updateWebhookEndpoint: (lagoId: string, data: UpdateWebhookEndpointPayload, params: RequestParams = {}) =>
      this.request<any, ApiErrorBadRequest | ApiErrorUnauthorized | ApiErrorNotFound | ApiErrorUnprocessableEntity>({
        path: `/webhook_endpoints/${lagoId}`,
        method: 'PUT',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * @description This endpoint is used to retrieve an existing webhook endpoint.
     *
     * @tags webhook_endpoints
     * @name FindWebhookEndpoint
     * @summary Retrieve a webhook endpoint
     * @request GET:/webhook_endpoints/{lago_id}
     * @secure
     */
    findWebhookEndpoint: (lagoId: string, params: RequestParams = {}) =>
      this.request<any, ApiErrorUnauthorized | ApiErrorNotFound>({
        path: `/webhook_endpoints/${lagoId}`,
        method: 'GET',
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * @description This endpoint is used to delete an existing webhook endpoint.
     *
     * @tags webhook_endpoints
     * @name DestroyWebhookEndpoint
     * @summary Delete a webhook endpoint
     * @request DELETE:/webhook_endpoints/{lago_id}
     * @secure
     */
    destroyWebhookEndpoint: (lagoId: string, params: RequestParams = {}) =>
      this.request<any, ApiErrorUnauthorized | ApiErrorNotFound | ApiErrorNotAllowed>({
        path: `/webhook_endpoints/${lagoId}`,
        method: 'DELETE',
        secure: true,
        format: 'json',
        ...params,
      }),
  };
}
