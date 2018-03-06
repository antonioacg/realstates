/**
 * @api {get} /realstates Lists all Real States
 * @apiName GetRealStates
 * @apiGroup Real State
 * @apiVersion  1.0.0
 * @apiPermission Token
 * @apiHeader {String} Authorization Bearer token
 *
 */

/**
 * @api {get} /realstates/:id Get a real state by its id
 * @apiName GetRealStateById
 * @apiGroup Real State
 * @apiVersion  1.0.0
 * @apiPermission Token
 * @apiHeader {String} Authorization Bearer token
 * @apiParam {String} id Real State unique ID
 */

/**
 * @api {post} /realstates/ Add a new Real State
 * @apiName AddRealState
 * @apiGroup Real State
 * @apiVersion  1.0.0
 * @apiPermission Token
 * @apiHeader {String} Authorization Bearer token
 * @apiParam {String} address Real State address
 * @apiParam {Number} price Real State price
 */
