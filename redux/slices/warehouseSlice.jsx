import { createSlice } from "@reduxjs/toolkit";

const warehouse = {
  module: null,
  id: "",
  entity: "",
  import_key: null,
  array_options: [],
  array_languages: null,
  contacts_ids: null,
  linkedObjectsIds: null,
  canvas: null,
  fk_project: null,
  contact_id: null,
  user: null,
  origin_type: null,
  origin_id: null,
  ref: "",
  ref_ext: null,
  statut: "",
  status: null,
  country_id: "",
  country_code: "",
  state_id: null,
  region_id: null,
  barcode_type: null,
  barcode_type_coder: null,
  mode_reglement_id: null,
  cond_reglement_id: null,
  demand_reason_id: null,
  transport_mode_id: null,
  shipping_method_id: null,
  shipping_method: null,
  fk_multicurrency: null,
  multicurrency_code: null,
  multicurrency_tx: null,
  multicurrency_total_ht: null,
  multicurrency_total_tva: null,
  multicurrency_total_ttc: null,
  multicurrency_total_localtax1: null,
  multicurrency_total_localtax2: null,
  last_main_doc: null,
  fk_account: null,
  note_public: null,
  note_private: null,
  total_ht: null,
  total_tva: null,
  total_localtax1: null,
  total_localtax2: null,
  total_ttc: null,
  lines: null,
  actiontypecode: null,
  name: null,
  lastname: null,
  firstname: null,
  civility_id: null,
  date_creation: null,
  date_validation: null,
  date_modification: null,
  tms: null,
  date_cloture: null,
  user_author: null,
  user_creation: null,
  user_creation_id: null,
  user_valid: null,
  user_validation: null,
  user_validation_id: null,
  user_closing_id: null,
  user_modification: null,
  user_modification_id: null,
  fk_user_creat: null,
  fk_user_modif: null,
  specimen: 0,
  extraparams: [],
  product: null,
  cond_reglement_supplier_id: null,
  deposit_percent: null,
  retained_warranty_fk_cond_reglement: null,
  warehouse_id: null,
  libelle: null,
  label: "",
  description: "",
  lieu: "",
  address: "",
  zip: "",
  town: "",
  phone: "",
  fax: "",
  fk_parent: null,
  warehouse_usage: null,
};

const warehouseSlice = createSlice({
  name: "warehouse",
  initialState: {
    warehouse: warehouse,
    warehouses: [],
  },
  reducers: {
    setWarehouses: (state, action) => {
      state.warehouses = action.payload;
    },

    setWarehouse: (state, action) => {
      state.warehouse = action.payload;
    },
    removeWarehouse: (state) => {
      // call when you delete warehouse to remove from state
      state.warehouse = {};
    },
  },
});

export const warehouseActions = warehouseSlice.actions;

export default warehouseSlice.reducer;
