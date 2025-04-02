import React from 'react';
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';
import EmployeeCard from './EmployeeCard';

function HierarchyRenderer({ employees, handleEdit, handleDelete, protectedRoles }) {
  const buildHierarchy = (employees) => {
    const employeeMap = {};
    employees.forEach((emp) => {
      employeeMap[emp.id] = { ...emp, subordinates: [] };
    });
    const hierarchy = [];
    employees.forEach((emp) => {
      if (emp.managerId === null || emp.managerId === '') {
        hierarchy.push(employeeMap[emp.id]);
      } else if (employeeMap[emp.managerId]) {
        employeeMap[emp.managerId].subordinates.push(employeeMap[emp.id]);
      } else {
        hierarchy.push(employeeMap[emp.id]);
      }
    });
    return hierarchy;
  };

  const renderVisualHierarchy = (hierarchy, level = 0) => {
    if (!hierarchy || hierarchy.length === 0) return null;
    return (
      <div className="flex flex-col items-center">
        <div className="flex justify-center space-x-16">
          {hierarchy.map((employee) => (
            <div key={employee.id} className="flex flex-col items-center">
              <EmployeeCard
                employee={employee}
                handleEdit={handleEdit}
                handleDelete={handleDelete}
                protectedRoles={protectedRoles}
              />
              {employee.subordinates && employee.subordinates.length > 0 && (
                <>
                  <div className="w-px h-10 bg-gray-400 mt-0"></div>
                  <div className="relative">
                    <div
                      className="absolute top-0 left-1/2 transform -translate-x-1/2 h-px bg-gray-400"
                      style={{ width: `${employee.subordinates.length * 180 - 30}px` }}
                    ></div>
                    <div
                      className="mt-10 flex justify-center"
                      style={{ marginLeft: `${-(employee.subordinates.length * 90) + 90}px` }}
                    >
                      {employee.subordinates.map((subordinate, i) => (
                        <div
                          key={subordinate.id}
                          className="flex flex-col items-center"
                          style={{ marginLeft: i === 0 ? 0 : '180px' }}
                        >
                          <div className="w-px h-10 bg-gray-400 -mt-10"></div>
                          {renderVisualHierarchy([subordinate], level + 1)}
                        </div>
                      ))}
                    </div>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  };

  const hierarchy = buildHierarchy(employees);

  return (
    <div className="min-w-full relative" style={{ height: '700px' }}>
      <TransformWrapper
        initialScale={1}
        initialPositionX={0}
        initialPositionY={0}
        minScale={0.3}
        maxScale={2}
        centerOnInit={true}
      >
        {({ zoomIn, zoomOut, resetTransform }) => (
          <>
            <div className="absolute bottom-4 right-4 bg-white rounded-lg shadow-lg p-2 flex space-x-2 z-10">
              <button
                onClick={() => zoomIn()}
                className="p-2 bg-gray-100 rounded-full hover:bg-gray-200"
                title="Zoom In"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
              <button
                onClick={() => zoomOut()}
                className="p-2 bg-gray-100 rounded-full hover:bg-gray-200"
                title="Zoom Out"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M5 10a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
              <button
                onClick={() => resetTransform()}
                className="p-2 bg-gray-100 rounded-full hover:bg-gray-200"
                title="Reset View"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </div>
            <TransformComponent
              wrapperStyle={{ width: '100%', height: '700px' }}
              contentStyle={{ width: '100%', padding: '20px' }}
            >
              <div className="min-w-full">
                {hierarchy.length > 0 ? (
                  renderVisualHierarchy(hierarchy)
                ) : (
                  <p className="text-gray-500 text-center">No employees found.</p>
                )}
              </div>
            </TransformComponent>
          </>
        )}
      </TransformWrapper>
    </div>
  );
}

export default HierarchyRenderer;