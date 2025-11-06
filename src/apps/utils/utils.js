import { format, formatDistanceToNow } from "date-fns";

export const formatDateTime = (date) => {
  return format(new Date(date), "dd MMM yyyy");
};

export const timeAgo = (date) => {
  return formatDistanceToNow(new Date(date), {
    addSuffix: true,
  });
};