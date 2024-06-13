import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { AlertNotif } from "./alertNotif";
import Succes from "@/assets/ImgModal/Ilustrasi-succes.svg";
import Error from "@/assets/ImgModal/Ilustrasi-failed.svg";
import { useState } from "react";
import { Button } from "@/components/ui/button";

export const AlertConfirm = ({
  textBtn,
  img,
  title,
  desc,
  textDialogCancel,
  textDialogSubmit,
  bgBtn,
  onConfirm,
  onClose,
  onClick,
  backround
}) => {
  const [succes, setSucces] = useState();

  function handleSubmit(e) {
    e.preventDefault();
    e.stopPropagation(); 
    setSucces(true);
    if (onConfirm) {
      onConfirm();
    }
    // if (onClose) {
    //   onClose();
    // }
    // if (onClick) {
    //   onClose();
    // }
    /* =======
  successOpen,
  setSuccessOpen,
  errorOpen,
  setErrorOpen,
}) => {
  const handleConfirm = async () => {
    try {
      await onConfirm();
    } catch (err) {
      setErrorOpen(true);
      console.error("Error deleting data: ", err);
    }
  };*/
  }
  return (
    <div>
      <AlertDialog className={`rounded bg-white ${backround}`}>
        <AlertDialogTrigger asChild className={`sm:rounded ${backround}`}>
          <Button variant="outline" className={`w-full ${backround}`}>{textBtn}</Button>
        </AlertDialogTrigger>
        <AlertDialogContent className="flex w-[464px] flex-col gap-6 bg-white sm:rounded-[16px] sm:p-6">
          <AlertDialogHeader className="flex flex-col gap-4">
            <AlertDialogHeader className="flex items-center justify-center">
              <img className="h-[100px] w-[240px]" src={img} alt="" />
            </AlertDialogHeader>
            <AlertDialogTitle className="text-center font-jakarta-sans text-lg font-bold">
              {title}
            </AlertDialogTitle>
            <AlertDialogDescription className="w-full text-center font-jakarta-sans text-sm font-medium text-neutral-600">
              {desc}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="flex items-center gap-6 sm:justify-center sm:space-x-0">
            <AlertDialogCancel className="h-[42px] w-full border-primary-500 text-[16px] font-medium text-primary-500 hover:text-primary-500 sm:rounded-[12px]">
              {textDialogCancel}
            </AlertDialogCancel>
            {bgBtn ? (
              <AlertDialogAction
                className="h-[42px] w-full bg-danger-500 text-[16px] font-medium text-neutral-100 hover:bg-primary-600 sm:rounded-[12px]"
                onClick={handleSubmit}
              >
                {textDialogSubmit}
              </AlertDialogAction>
            ) : (
              <AlertDialogAction
                className="h-[42px] w-full bg-primary-500 text-[16px] font-medium text-neutral-100 hover:bg-primary-600 sm:rounded-[12px]"
                onClick={handleSubmit}
              >
                {textDialogSubmit}
              </AlertDialogAction>
            )}
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* <AlertNotif
        open={successOpen}
        onOpenChange={setSuccessOpen}
        img={Succes}
        title="Sukses!"
        desc="Proses berhasil dilakukan."
        type="success"
      />
      <AlertNotif
        open={errorOpen}
        onOpenChange={setErrorOpen}
        img={Error}
        title="Gagal"
        desc="Proses gagal dilakukan"
        type="error"
      /> */}
    </div>
  );
};