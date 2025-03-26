import React, { useEffect } from "react";
import { Button } from "./ui/button";
import { usePurchaseCourseMutation } from "@/features/api/purchaseApi";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

const BuyCourseButton = ({ courseId }) => {
  const [purchaseCourse, { data, isLoading, isSuccess, isError, error }] =
    usePurchaseCourseMutation();

  const purchaseCourseHandler = async () => {
    await purchaseCourse({ courseId });
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success("Course purchased successfully! 🎉");
    }
    if (isError) {
      toast.error(error?.data?.message || "Failed to purchase course.");
    }
  }, [data, isSuccess, isError, error]);

  return (
    <Button
      disabled={isLoading}
      onClick={purchaseCourseHandler}
      className="w-full"
    >
      {isLoading ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Processing...
        </>
      ) : (
        "Purchase Course"
      )}
    </Button>
  );
};

export default BuyCourseButton;
