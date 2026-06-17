
import mongoose from "mongoose";
import { Conversation } from "../models/Conversation";
import { ApiError } from "../utils/ApiError";
import { HTTP_STATUS } from "../constants/httpStatus";
import { User } from "../models/User";

export const createGroupService = async (
  creatorId: string,
  name: string,
  memberIds: string[],
  avatar?: string,
) => {

  if (!name || name.trim().length === 0) {
    throw new ApiError(
      "Group name required",
      HTTP_STATUS.BAD_REQUEST
    );
  }

  if (!Array.isArray(memberIds) || memberIds.length === 0) {
    throw new ApiError(
      "Group must have members",
      HTTP_STATUS.BAD_REQUEST
    );
  }

  const uniqueMembers = [...new Set(memberIds)];

  const filteredMembers = uniqueMembers.filter(
    id => id !== creatorId
  );

  const currentUser = await User.findById(creatorId);

  if (!currentUser) {
    throw new ApiError("User not found", HTTP_STATUS.NOT_FOUND);
  }

  const isValid = filteredMembers.every(id =>
    currentUser.following.some(f => f.toString() === id)
  );

  if (!isValid) {
    throw new ApiError(
      "You can only add users you follow",
      HTTP_STATUS.BAD_REQUEST
    );
  }

  const users = await User.find({
    _id: { $in: filteredMembers }
  });

  if (users.length !== filteredMembers.length) {
    throw new ApiError(
      "Some users not found",
      HTTP_STATUS.NOT_FOUND
    );
  }

  const participants = [
    new mongoose.Types.ObjectId(creatorId),
    ...filteredMembers.map(id => new mongoose.Types.ObjectId(id))
  ];

  const group = await Conversation.create({
    type: "GROUP",
    groupName: name.trim(),
    groupAdmin: creatorId,
    groupAvatar: avatar || "",
    participants,
    unreadBy: []
  });

  return Conversation.findById(group._id)
    .populate("participants", "-password");
};

export const addGroupMemberService = async (
  groupId: string,
  adminId: string,
  newMemberId: string
) => {

  if (!mongoose.isValidObjectId(newMemberId)) {
    throw new ApiError("Invalid user id", HTTP_STATUS.BAD_REQUEST);
  }

  const group = await Conversation.findById(groupId);

  if (!group || group.type !== "GROUP") {
    throw new ApiError("Group not found", HTTP_STATUS.NOT_FOUND);
  }

  if (group.groupAdmin?.toString() !== adminId) {
    throw new ApiError("Only admin can perform this action", HTTP_STATUS.FORBIDDEN);
  }

  const user = await User.findById(newMemberId);

  if (!user) {
    throw new ApiError("User not found", HTTP_STATUS.NOT_FOUND);
  }

  const alreadyExists = group.participants.some(
    id => id.toString() === newMemberId
  );

  if (alreadyExists) {
    throw new ApiError("User already in group", HTTP_STATUS.BAD_REQUEST);
  }

  const adminUser = await User.findById(adminId);

  const isFollowing = adminUser?.following.some(
    id => id.toString() === newMemberId
  );

  if (!isFollowing) {
    throw new ApiError(
      "You can only add users you follow",
      HTTP_STATUS.BAD_REQUEST
    );
  }

  group.participants.push(new mongoose.Types.ObjectId(newMemberId));

  await group.save();

  return Conversation.findById(groupId)
    .populate("participants", "-password");
};

export const removeGroupMemberService = async (
  groupId: string,
  adminId: string,
  memberId: string
) => {

  const group = await Conversation.findById(groupId);

  if (!group || group.type !== "GROUP") {
    throw new ApiError("Group not found", HTTP_STATUS.NOT_FOUND);
  }

  if (group.groupAdmin?.toString() !== adminId) {
    throw new ApiError("Only admin can perform this action", HTTP_STATUS.FORBIDDEN);
  }

  if (memberId === adminId) {
    throw new ApiError(
      "Admin cannot remove themselves",
      HTTP_STATUS.BAD_REQUEST
    );
  }

  const exists = group.participants.some(
    id => id.toString() === memberId
  );

  if (!exists) {
    throw new ApiError(
      "User not in group",
      HTTP_STATUS.BAD_REQUEST
    );
  }

  group.participants = group.participants.filter(
    id => id.toString() !== memberId
  );

  group.unreadBy = group.unreadBy.filter(
    id => id.toString() !== memberId
  );

  await group.save();

  return Conversation.findById(groupId)
    .populate("participants", "-password");
};

export const updateGroupNameService = async (
  groupId: string,
  adminId: string,
  newName: string
) => {

  if (!newName || newName.trim().length === 0) {
    throw new ApiError(
      "Group name required",
      HTTP_STATUS.BAD_REQUEST
    );
  }

  const group = await Conversation.findById(groupId);

  if (!group || group.type !== "GROUP") {
    throw new ApiError(
      "Group not found",
      HTTP_STATUS.NOT_FOUND
    );
  }

  if (!group.groupAdmin || group.groupAdmin.toString() !== adminId) {
    throw new ApiError(
        "Only admin can perform this action",
        HTTP_STATUS.FORBIDDEN
    );
  }

  group.groupName = newName.trim();

  await group.save();

  return Conversation.findById(groupId)
    .populate("participants", "-password");
};

export const leaveGroupService = async (
  groupId: string,
  userId: string
) => {

  const group = await Conversation.findById(groupId);

  if (!group || group.type !== "GROUP") {
    throw new ApiError("Group not found", HTTP_STATUS.NOT_FOUND);
  }

  const isParticipant = group.participants.some(
    id => id.toString() === userId
  );

  if (!isParticipant) {
    throw new ApiError("User not part of this group", HTTP_STATUS.BAD_REQUEST);
  }

  if (group.groupAdmin?.toString() === userId) {
    throw new ApiError(
      "Admin cannot leave group. Transfer admin first.",
      HTTP_STATUS.BAD_REQUEST
    );
  }

  group.participants = group.participants.filter(
    id => id.toString() !== userId
  );

  group.unreadBy = group.unreadBy.filter(
    id => id.toString() !== userId
  );

  await group.save();

  return Conversation.findById(groupId)
    .populate("participants", "-password");
};
