import { useTheme } from "../../Context/ThemeProvider";

export default function Table({ columns, data }) {
  // ✅ Get darkMode from context
  const { darkMode } = useTheme();

  return (
    <div
      className={`overflow-x-auto rounded-xl shadow-md ${
        darkMode ? "bg-gray-800" : "bg-white"
      }`}
    >
      <table
        className={`min-w-full text-sm ${
          darkMode ? "text-gray-200" : "text-gray-800"
        }`}
      >
        {/* Table Header */}
        <thead
          className={
            darkMode ? "bg-gray-700 text-gray-300" : "bg-gray-200 text-gray-700"
          }
        >
          <tr>
            {columns.map((col) => (
              <th
                key={col.key}
                className="px-4 py-3 text-left font-semibold uppercase text-xs tracking-wider"
              >
                {col.title}
              </th>
            ))}
          </tr>
        </thead>

        {/* Table Body */}
        <tbody>
          {data.map((row, i) => (
            <tr
              key={i}
              className={`transition-colors ${
                darkMode
                  ? "border-b border-gray-700 hover:bg-gray-700/50"
                  : "border-b border-gray-100 hover:bg-gray-100"
              }`}
            >
              {columns.map((col) => (
                <td key={col.key} className="px-4 py-3">
                  {row[col.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
