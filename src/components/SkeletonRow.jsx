'use client';

export default function SkeletonRow({ count = 5 }) {
  return (
    <>
      {[...Array(count)].map((_, i) => (
        <tr key={i} className="border-b border-gray-700/50 animate-pulse">
          <td className="py-4 px-4">
            <div className="h-4 bg-gray-700 rounded w-3/4" />
          </td>
          <td className="py-4 px-4">
            <div className="h-4 bg-gray-700 rounded w-1/2" />
          </td>
          <td className="py-4 px-4">
            <div className="h-4 bg-gray-700 rounded w-1/3" />
          </td>
          <td className="py-4 px-4">
            <div className="h-4 bg-gray-700 rounded w-1/4" />
          </td>
        </tr>
      ))}
    </>
  );
}