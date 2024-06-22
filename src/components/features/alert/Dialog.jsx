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

export default function Dialog({
  children,
  title,
  description,
  action,
  type,
  img,
  textSubmit, textCancel,
  actionTitle,
}) {
  const handleConfirm = () => {
    action();
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger className={`w-full`}>{children}</AlertDialogTrigger>
      <AlertDialogContent>
        <img
          src={img}
          alt="alert"
          className="mx-auto mb-8"
          width={242}
          height={100}
        />

        <AlertDialogHeader>
          <AlertDialogTitle className="text-center text-lg font-bold">
            {title}{" "}
          </AlertDialogTitle>
          <AlertDialogDescription className="text-center text-sm font-medium">
            {description}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="flex">
          <AlertDialogCancel className="flex-1 hover:bg-neutral-100 hover:text-neutral-800">
            {textCancel}
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={handleConfirm}
            className={`${type == "danger" ? "bg-danger-400 hover:bg-danger-500" : "bg-primary-500 hover:bg-primary-600"}`}
          >
            {textSubmit}
            {actionTitle}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
