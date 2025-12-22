import { Router } from "express";
import { jwtVerify } from "../middlewares/auth.middlewares.js";
import {
  getFriendSettlementController,
  settleFriendSettlementController,
  groupSettlementInfoController,
  settleGroupDebtController,
} from "../controllers/settlement.controllers.js";

const settlementRouter: Router = Router();

settlementRouter.get(
  "/friend/:friendId/info",
  jwtVerify,
  getFriendSettlementController,
);
settlementRouter.post(
  "/friend/:friendId/settle",
  jwtVerify,
  settleFriendSettlementController,
);
settlementRouter.get(
  "/groups/:groupId/info",
  jwtVerify,
  groupSettlementInfoController,
);
settlementRouter.post(
  "/groups/:groupId/settle/:friendId",
  jwtVerify,
  settleGroupDebtController,
);

export { settlementRouter };
