type AnyObject = {
  [key: string]: any;
};

declare type DC_PARAMS = {
  delFn: Function;
  delParams: AnyObject;
  delKey?: string;
  cbFn?: Function;
  cbParams?: AnyObject;
};

// declare function deleteConfirmModal(params);

// export { deleteConfirmModal };
