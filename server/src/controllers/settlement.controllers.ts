import { Request, Response } from "express";
import { asyncHandler } from "../utils/asyncHandler.js";

import { SettlementService } from "../services/settlement.services.js";
const settlementService = new SettlementService();

export const getFriendSettlementController = asyncHandler(
  async (req: Request, res: Response) => {
    try {
      const currentUserId = req.user?.id as string;

      const { friendId } = req.params;

      if (!friendId) {
        return res.status(400).json({
          success: false,
          message: "Friend username is required",
        });
      }

      const info = await settlementService.getFriendSettlementInfo(
        currentUserId,
        friendId,
      );

      return res.status(200).json({
        success: true,
        data: info,
      });
    } catch (error: any) {
      console.log("Error: ", error.message);

      return res.status(500).json({
        message: "Internal Server Error while fetching friend settlement",
        success: false,
      });
    }
  },
);

export const settleFriendSettlementController = asyncHandler(
  async (req: Request, res: Response) => {
    try {
      const currentUserId = req.user?.id as string;

      const { friendId } = req.params;

      const { amount, note } = req.body as {
        amount: number;
        note: string;
      };

      if (!friendId || !amount) {
        return res.status(400).json({
          success: false,
          message: "friendUsername and amount are required",
        });
      }

      if (amount <= 0) {
        return res.status(400).json({
          success: false,
          message: "Amount must be greater than 0",
        });
      }

      const info = await settlementService.settleFriendSettlement(
        currentUserId,
        friendId,
        amount,
        note,
      );

      return res.status(200).json({
        success: true,
        data: info,
      });
    } catch (error: any) {
      console.log("Error: ", error.message);

      return res.status(500).json({
        message: "Internal Server Error while fetching friend settlement",
        success: false,
      });
    }
  },
);

export const groupSettlementInfoController = asyncHandler(
  async (req: Request, res: Response) => {
    try {
      const { groupId } = req.params;

      const currentUserId = req.user?.id as string;

      const info = await settlementService.groupSettlementInfo(
        currentUserId,
        groupId,
      );

      return res.status(200).json({
        message: "Group settlement info fetched successfully!!",
        success: true,
        data: info,
      });
    } catch (error: any) {
      console.log("Error: ", error.message);

      return res.status(500).json({
        message: "Internal Server Error while fetching group settlement info",
        seccess: false,
      });
    }
  },
);

export const settleGroupDebtController = asyncHandler(
  async (req: Request, res: Response) => {
    try {
      const currentUserId = req.user?.id as string;

      const { amount, note } = req.body as {
        amount: number;
        note: string;
      };
      const { groupId, friendId } = req.params;

      if (!amount) {
        return res.status(400).json({
          success: false,
          message: "Amount is required",
        });
      }

      if (amount <= 0) {
        return res.status(400).json({
          success: false,
          message: "Amount must be greater than 0",
        });
      }

      const result = await settlementService.settleGroupDebt(
        currentUserId,
        groupId,
        friendId,
        amount,
        note,
      );

      return res.status(201).json({
        success: true,
        data: result,
        message: "Group settlement recorded successfully",
      });
    } catch (error: any) {
      console.log("Error: ", error.message);

      return res.status(500).json({
        message: "Internal Server Error while fetching group settlement info",
        seccess: false,
      });
    }
  },
);
