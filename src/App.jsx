import { Routes, Route } from "react-router-dom";
import { DetailAdmin } from "@/pages/ManageAdmin/DetailAdmin/index";
import { AddAdmin } from "@/pages/ManageAdmin/AddAdmin/index";
import { LoginPage } from "@/pages/login";
import { DisplayAdmin } from "@/pages/ManageAdmin/DisplayAdmin/index";
import { EditAdmin } from "@/pages/ManageAdmin/EditAdmin/index";
import { Toaster } from "@/components/ui/sonner";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import DashboardPage from "@/pages/Dashboard";
import ManageUser from "@/pages/ManageUser/index";
import UserDetail from "@/pages/ManageUser/UserDetail";
import UserCreate from "@/pages/ManageUser/UserCreate";
import UserEdit from "@/pages/ManageUser/UserEdit";
import ManageContent from "@/pages/manageContent/index";
import DetailContent from "@/pages/manageContent/detailContent";
import EditContent from "@/pages/manageContent/editContent";
import CreateContent from "@/pages/manageContent/createContent";
import ManageRoute from "@/pages/ManageRoute/index";
import DetailRoute from "@/pages/ManageRoute/DetailRoute";
import ProtectedRoute from "@/hooks/protectedRoute";
import { privateRoutes } from "@/constant/routes";
import DestinationPage from "@/pages/destination";
import CreateDestination from "@/pages/destination/create";
import DetailDestination from "@/pages/destination/detail";
import Spinner from "./components/ui/Spinner";
import NotFound from "./components/features/error/NotFound";

function App() {
  const currentUser = useSelector((state) => state.auth.user);
  const loading = useSelector((state) => state.auth.loading);

  if (currentUser === undefined || loading) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-white">
        <Spinner />
      </div>
    );
  }

  return (
    <>
      <Routes>
        {/* Private Routes */}
        {/* Admin */}
        <Route element={<ProtectedRoute requiredRole="super admin" />}>
          <Route
            path={`${privateRoutes.ADMIN}/detail/:id`}
            element={currentUser ? <DetailAdmin /> : <Navigate to="/login" />}
          />
          <Route
            path={`${privateRoutes.ADMIN}/edit/:id`}
            element={currentUser ? <EditAdmin /> : <Navigate to="/login" />}
          />
          <Route
            path={`${privateRoutes.ADMIN}/create`}
            element={currentUser ? <AddAdmin /> : <Navigate to="/login" />}
          />
          <Route
            path={privateRoutes.ADMIN}
            element={currentUser ? <DisplayAdmin /> : <Navigate to="/login" />}
          />
        </Route>
        {/* Dashboard */}

        <Route
          path={privateRoutes.DASHBOARD}
          element={currentUser ? <DashboardPage /> : <Navigate to="/login" />}
        />

        {/* Content */}

        <Route
          path={privateRoutes.CONTENT}
          element={currentUser ? <ManageContent /> : <Navigate to="/login" />}
        />

        <Route
          path={`${privateRoutes.CONTENT}/create`}
          element={currentUser ? <CreateContent /> : <Navigate to="/login" />}
        />
        <Route
          path={`${privateRoutes.CONTENT}/detail`}
          element={currentUser ? <DetailContent /> : <Navigate to="/login" />}
        />
        <Route
          path={`${privateRoutes.CONTENT}/edit`}
          element={<EditContent />}
        />

        {/* User */}

        <Route
          path={privateRoutes.USER}
          element={currentUser ? <ManageUser /> : <Navigate to="/login" />}
        />
        <Route
          path={`${privateRoutes.USER}/detail/:id`}
          element={currentUser ? <UserDetail /> : <Navigate to="/login" />}
        />
        <Route
          path={`${privateRoutes.USER}/create`}
          element={currentUser ? <UserCreate /> : <Navigate to="/login" />}
        />
        <Route
          path={`${privateRoutes.USER}/edit/:id`}
          element={currentUser ? <UserEdit /> : <Navigate to="/login" />}
        />

        {/* Route */}

        <Route
          path={privateRoutes.ROUTE}
          element={currentUser ? <ManageRoute /> : <Navigate to="/login" />}
        />
        <Route
          path={`${privateRoutes.ROUTE}/:id`}
          element={currentUser ? <DetailRoute /> : <Navigate to="/login" />}
        />

        {/* User */}

        <Route
          path={privateRoutes.USER}
          element={currentUser ? <ManageUser /> : <Navigate to="/login" />}
        />

        {/* Destination */}
        <Route
          path={privateRoutes.DESTINATION}
          element={currentUser ? <DestinationPage /> : <Navigate to="/login" />}
        />
        <Route
          path={privateRoutes.DESTINATION + "/create"}
          element={
            currentUser ? <CreateDestination /> : <Navigate to="/login" />
          }
        />
        <Route
          path={privateRoutes.DESTINATION + "/detail/:id"}
          element={
            currentUser ? <DetailDestination /> : <Navigate to="/login" />
          }
        />

        {/* Public Routes */}
   
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={<Navigate to="/dashboard" />} />
        <Route
          path="/login"
          element={currentUser ? <Navigate to="/dashboard" /> : <LoginPage />}
        />

        {/* 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Toaster />
    </>
  );
}

export default App;