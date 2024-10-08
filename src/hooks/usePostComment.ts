import { addComment } from "@/actions/addComment";
import { updateComment } from "@/actions/updateComment";
import { addOrUpdateCommentType } from "@/types/commonTypes";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

export const usePostComment = () => {
  const { mutate, isPending } = useMutation({
    mutationFn: async (inputs: addOrUpdateCommentType) => {
      if (inputs && inputs.commentType === "add") {
        return await addComment(inputs);
      } else if (
        inputs.commentType === "edit" &&
        inputs.commentId &&
        typeof inputs.commentId === "string"
      ) {
        return await updateComment(inputs);
      }
    },
    onSuccess: (data) => {
      if (data?.error || !data?.success) {
        toast.message("Failed to post comment");
      } else {
        toast.message("Comment posted successfully");
      }
    },
    onError: (error) => {
      console.log(error);
      toast.error("Failed to  post comment");
    },
  });

  return {
    mutate,
    isPending,
  };
};
