import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";

export default function Sidebar() {
  /*   const menu = [
    { label: "Dashboard", path: routes.dashboard },
    { label: "Employees", path: routes.employees },
    { label: "Products", path: routes.products },
    { label: "Sales", path: routes.sales },
    { label: "Reports", path: routes.reports },
  ] as const; */

  return (
    <motion.aside
      initial={{ x: -80 }}
      animate={{ x: 0 }}
      transition={{ duration: 0.4 }}
      className="w-64 bg-base-200 min-h-screen p-6"
    >
      <h1 className="text-2xl font-bold mb-8">BMS</h1>

      <ul className="menu gap-2">
        {/*        {menu.map((item) => (
          <li key={item.path}>
            <Link
              to={item.path}
              activeProps={{ className: "active" }}
              activeOptions={{ exact: true }}
            >
              {item.label}
            </Link>
          </li>
        ))} */}
      </ul>
    </motion.aside>
  );
}
