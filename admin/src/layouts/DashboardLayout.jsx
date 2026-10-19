

import { Outlet } from "react-router";

const DashboardLayout = () => {
  return (
    <div>
      <h1>sidebar</h1>
      <h1>navbar</h1>
      <main>
        <Outlet />
      </main>
    </div>
  )
}

export default DashboardLayout