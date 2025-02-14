// "use client";

// import React, { useEffect, useState } from "react";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { JNTUHService } from "@/lib/api";
// import { Results, SemesterResult, StudentResult, Subject } from "@/lib/types";
// import AdBanner from "@/components/Adsense/AdBanner";
// // import Script from "next/script";

// // Loading State with Ad
// const LoadingState = () => (
//   <div className="space-y-6">
//     <div className="text-center p-8 animate-pulse">
//       <div className="h-8 bg-gray-200 rounded w-64 mx-auto mb-4"></div>
//       <div className="h-4 bg-gray-200 rounded w-48 mx-auto"></div>
//     </div>
//     <AdBanner adSlot="8973292958" adFormat="rectangle" className="my-4" />
//   </div>
// );

// // Error State with Ad
// const ErrorState = ({ message }: { message: string }) => (
//   <div className="space-y-6">
//     <div className="text-center text-red-500 p-8">{message}</div>
//     <AdBanner adSlot="8973292958" adFormat="horizontal" className="my-4" />
//   </div>
// );

// type Grade = "O" | "A+" | "A" | "B+" | "B" | "C" | "F";

// const getGradeColor = (grade: Grade): string => {
//   const colors: Record<Grade, string> = {
//     O: "text-green-600",
//     "A+": "text-green-500",
//     A: "text-green-400",
//     "B+": "text-blue-500",
//     B: "text-blue-400",
//     C: "text-yellow-500",
//     F: "text-red-500",
//   };
//   return colors[grade] || "text-gray-600";
// };

// interface ResultsTableProps {
//   subjects: Subject[];
//   semesterNumber: string;
//   gpa: string;
//   semesterData: SemesterResult;
//   showAd?: boolean;
// }

// const ResultsTable: React.FC<ResultsTableProps> = ({
//   subjects,
//   semesterNumber,
//   gpa,
//   semesterData,
//   showAd,
// }) => {
//   return (
//     <>
//       <Card className="w-full mb-6">
//         <CardHeader>
//           <CardTitle className="flex justify-between items-center">
//             <span>Semester {semesterNumber}</span>
//             <span className="text-lg">
//               SGPA: <span className="font-bold">{gpa}</span>
//             </span>
//           </CardTitle>
//         </CardHeader>
//         <CardContent>
//           <Table>
//             <TableHeader>
//               <TableRow>
//                 <TableHead className="w-24">Code</TableHead>
//                 <TableHead>Subject</TableHead>
//                 <TableHead className="w-24 text-center">Credits</TableHead>
//                 <TableHead className="w-24 text-center">Grade</TableHead>
//                 <TableHead className="w-32 text-center">Total Marks</TableHead>
//               </TableRow>
//             </TableHeader>
//             <TableBody>
//               {subjects.map((subject) => (
//                 <TableRow key={subject.subject_code}>
//                   <TableCell className="font-mono">
//                     {subject.subject_code}
//                   </TableCell>
//                   <TableCell>{subject.subject_name}</TableCell>
//                   <TableCell className="text-center">
//                     {subject.subject_credits}
//                   </TableCell>
//                   <TableCell className="text-center">
//                     <span
//                       className={`font-bold ${getGradeColor(
//                         subject.subject_grade as Grade
//                       )}`}
//                     >
//                       {subject.subject_grade}
//                     </span>
//                   </TableCell>
//                   <TableCell className="text-center">
//                     {subject.subject_total || "-"}
//                   </TableCell>
//                 </TableRow>
//               ))}
//             </TableBody>
//           </Table>

//           <div className="mt-4 flex justify-between items-center text-sm text-gray-600">
//             <div>Total Credits: {(semesterData as any).credits}</div>
//             <div>Total Marks: {(semesterData as any).total}</div>
//           </div>
//         </CardContent>
//       </Card>
//       {showAd && (
//         <AdBanner adSlot="8973292958" adFormat="horizontal" className="my-6" />
//       )}
//     </>
//   );
// };

// const StudentResultsTables: React.FC<{ htno: string }> = ({ htno }) => {
//   const [results, setResults] = useState<Results | null>(null);
//   const [studentResult, setStudentResult] = useState<StudentResult | null>(
//     null
//   );
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     const fetchResults = async () => {
//       try {
//         const result = await JNTUHService.getStudentResults(htno);
//         setStudentResult(result);
//         setResults(result.Results);
//       } catch (err) {
//         setError(err instanceof Error ? err.message : "An error occurred");
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     fetchResults();
//   }, [htno]);

//   if (isLoading) {
//     return <LoadingState />;
//   }

//   if (error) {
//     return <ErrorState message={error} />;
//   }

//   if (!results || !studentResult) {
//     return <ErrorState message="No results found" />;
//   }

//   const semesters = JNTUHService.getSemestersList(results).sort((a, b) => {
//     const [aYear, aSem] = a.split("-").map(Number);
//     const [bYear, bSem] = b.split("-").map(Number);
//     return aYear === bYear ? aSem - bSem : aYear - bYear;
//   });

//   return (
//     <>

//       <div className="space-y-6">
//         {/* Top Ad */}
//         <AdBanner adSlot="8973292958" adFormat="horizontal" className="mb-6" />

//         {studentResult.Details && (
//           <Card className="mb-6">
//             <CardContent className="pt-6">
//               <div className="grid grid-cols-2 gap-4 text-sm">
//                 <div>
//                   <p className="font-semibold">Name:</p>
//                   <p>{studentResult.Details.NAME}</p>
//                 </div>
//                 <div>
//                   <p className="font-semibold">Hall Ticket:</p>
//                   <p>{studentResult.Details.Roll_No}</p>
//                 </div>
//                 <div>
//                   <p className="font-semibold">Father Name:</p>
//                   <p>{studentResult.Details.FATHER_NAME}</p>
//                 </div>
//                 <div>
//                   <p className="font-semibold">College Code:</p>
//                   <p>{studentResult.Details.COLLEGE_CODE}</p>
//                 </div>
//               </div>
//             </CardContent>
//           </Card>
//         )}

//         {semesters.map((semester, index) => (
//           <ResultsTable
//             key={semester}
//             subjects={JNTUHService.getSemesterSubjects(results, semester)}
//             semesterNumber={semester}
//             gpa={JNTUHService.getSemesterGPA(results, semester)}
//             semesterData={results[semester] as SemesterResult}
//             showAd={(index + 1) % 2 === 0} // Show ad after every 2nd semester
//           />
//         ))}

//         <Card className="bg-gray-50">
//           <CardContent className="pt-6">
//             <div className="text-center">
//               <h2 className="text-2xl font-bold">
//                 Overall CGPA: {results.Total}
//               </h2>
//             </div>
//           </CardContent>
//         </Card>

//         {/* Bottom Ad */}
//         <AdBanner adSlot="8973292958" adFormat="horizontal" className="mt-6" />
//       </div>
//     </>
//   );
// };

// export default StudentResultsTables;

"use client";

import React, { useEffect, useState, useRef } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { JNTUHService } from "@/lib/api";
import { Results, SemesterResult, StudentResult, Subject } from "@/lib/types";

import AdBanner from "@/components/Adsense/AdBanner";
// // import Script from "next/script";

// // Loading State with Ad
const LoadingState = () => (
  <div className="space-y-6">
    <div className="text-center p-8 animate-pulse">
      <div className="h-8 bg-gray-200 rounded w-64 mx-auto mb-4"></div>
      <div className="h-4 bg-gray-200 rounded w-48 mx-auto"></div>
    </div>
   <p className="text-center">Loading....</p>
    <AdBanner adSlot="8973292958" adFormat="rectangle" className="my-4" />
  </div>
);

// // Error State with Ad
const ErrorState = ({ message }: { message: string }) => (
  <div className="space-y-6">
    <div className="text-center text-red-500 p-8">{message}</div>
    <AdBanner adSlot="8973292958" adFormat="horizontal" className="my-4" />
  </div>
);

type Grade = "O" | "A+" | "A" | "B+" | "B" | "C" | "F";

const getGradeColor = (grade: Grade): string => {
  const colors: Record<Grade, string> = {
    O: "text-green-600",
    "A+": "text-green-500",
    A: "text-green-400",
    "B+": "text-blue-500",
    B: "text-blue-400",
    C: "text-yellow-500",
    F: "text-red-500",
  };
  return colors[grade] || "text-gray-600";
};

interface ResultsTableProps {
  subjects: Subject[];
  semesterNumber: string;
  gpa: string;
  semesterData: SemesterResult;
  showAd?: boolean;
}

const ResultsTable: React.FC<ResultsTableProps> = ({
  subjects,
  semesterNumber,
  gpa,
  semesterData,
  showAd,
}) => {
  return (
    <div className="mb-4 break-inside-avoid">
      <h3 className="text-lg font-semibold mb-2">
        Semester {semesterNumber} - SGPA: {gpa}
      </h3>
      <div className="overflow-x-auto mb-10">
        <Table className="w-full text-xs">
          <TableHeader>
            <TableRow>
              <TableHead className="w-20">Code</TableHead>
              <TableHead className="min-w-[150px]">Subject</TableHead>
              <TableHead className="w-16 text-center">Internal</TableHead>
              <TableHead className="w-16 text-center">External</TableHead>
              <TableHead className="w-16 text-center">Credits</TableHead>
              <TableHead className="w-16 text-center">Grade</TableHead>
              <TableHead className="w-20 text-center">Total Marks</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {subjects.map((subject) => (
              <TableRow key={subject.subject_code}>
                <TableCell className="font-mono">
                  {subject.subject_code}
                </TableCell>
                <TableCell
                  className="truncate max-w-[200px]"
                  title={subject.subject_name}
                >
                  {subject.subject_name}
                </TableCell>
                <TableCell className="text-center">
                  {subject.subject_internal}
                </TableCell>
                <TableCell className="text-center">
                  {subject.subject_external}
                </TableCell>
                <TableCell className="text-center">
                  {subject.subject_credits}
                </TableCell>
                <TableCell className="text-center">
                  <span
                    className={`font-bold ${getGradeColor(
                      subject.subject_grade as Grade
                    )}`}
                  >
                    {subject.subject_grade}
                  </span>
                </TableCell>
                <TableCell className="text-center">
                  {subject.subject_total || "-"}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <div className="mt-2 flex justify-between items-center text-xs text-gray-600">
        <div>Total Credits: {(semesterData as any).credits}</div>
        <div>Total Marks: {(semesterData as any).total}</div>
      </div>
      {showAd && (
        <AdBanner adSlot="8973292958" adFormat="horizontal" className="my-6" />
      )}
    </div>
  );
};
const StudentResultsTables: React.FC<{ htno: string }> = ({ htno }) => {
  const [results, setResults] = useState<Results | null>(null);
  const [studentResult, setStudentResult] = useState<StudentResult | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const printRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const result = await JNTUHService.getStudentResults(htno);
        setStudentResult(result);
        setResults(result.Results);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setIsLoading(false);
      }
    };

    fetchResults();
  }, [htno]);

  // const handlePrint = () => {
  //   if (printRef.current) {
  //     const printContents = printRef.current.innerHTML;
  //     const originalContents = document.body.innerHTML;
  //     document.body.innerHTML = printContents;
  //     window.print();
  //     document.body.innerHTML = originalContents;
  //   }
  // };


  const handlePrint = () => {
    const printContents = printRef.current?.innerHTML;

    if (printContents) {

      const printWindow = window.open("", "_blank");

      printWindow?.document.write(`
        <html>
          <head>
            <title>Print Results</title>
            <link
              href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css"
              rel="stylesheet"
            >
            <style>
              @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&display=swap');
              body {
                font-family: 'Inter', sans-serif;
                -webkit-print-color-adjust: exact;
                print-color-adjust: exact;
              }
              @page {
                size: A4;
                margin: 10mm;
              }
              .watermark {
                display: block;
                position: fixed;
                bottom: 10mm;
                left: 0;
                right: 0;
                text-align: center;
                font-size: 9pt;
                color: #666;
              }
            </style>
          </head>
          <body>
            ${printContents}
          </body>
        </html>
      `);

      // Close the tab after printing
      printWindow?.addEventListener("afterprint", () => {
        printWindow.close();
      });

      printWindow?.document.close();
      printWindow?.focus();
      printWindow?.print();
    }
  };


  useEffect(() => {
    const handlePrintShortcut = (event: KeyboardEvent) => {
      // Check if the user pressed Ctrl+P or Cmd+P
      if ((event.ctrlKey || event.metaKey) && event.key === "p") {
        event.preventDefault(); // Prevent default browser print behavior
        handlePrint(); // Trigger the custom print handler
      }
    };

    // Add the event listener
    window.addEventListener("keydown", handlePrintShortcut);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener("keydown", handlePrintShortcut);
    };
  }, []);

  if (isLoading) {
    // return <div className="text-center p-8">Loading...</div>;
    return <LoadingState />;
  }

  if (error) {
    // return <div className="text-center text-red-500 p-8">{error}</div>;
    return <ErrorState message={error} />;
  }

  if (!results || !studentResult) {
    // return <div className="text-center text-red-500 p-8">No results found</div>;
    //     return <ErrorState message="No results found" />;
  }

  const semesters = JNTUHService.getSemestersList(results).sort((a, b) => {
    const [aYear, aSem] = a.split("-").map(Number);
    const [bYear, bSem] = b.split("-").map(Number);
    return aYear === bYear ? aSem - bSem : aYear - bYear;
  });

  return (
    <div className="max-w-4xl mx-auto p-4">
      {/* <Button onClick={handlePrint} className="mb-4">
        Print Results
      </Button> */}
       {/* Top Ad */}
      <AdBanner adSlot="8973292958" adFormat="horizontal" className="mb-6" />
      <div ref={printRef} className="bg-white p-4">
        <style type="text/css">{`
          @page {
            size: A4;
            margin: 10mm;
          }
          body {
            -webkit-print-color-adjust: exact;
            print-color-adjust: exact;
          }


           .watermark {
           display: none; /* Hide in all views */
  }
  @media print {
    .watermark {
      display: block; /* Show only in print view */
      position: fixed;
      bottom: 10mm;
      left: 0;
      right: 0;
      text-align: center;
      font-size: 9pt;
      color: #666;
    }
  }
        `}</style>
        <div className="text-center mb-4">
          <h1 className="text-2xl  font-bold">Student Results</h1>
        </div>
        {studentResult.Details && (
          <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
            <div>
              <strong>Name:</strong> {studentResult.Details.NAME}
            </div>
            <div>
              <strong>Hall Ticket:</strong> {studentResult.Details.Roll_No}
            </div>
            <div>
              <strong>Father's Name:</strong>{" "}
              {studentResult.Details.FATHER_NAME}
            </div>
            <div>
              <strong>College Code:</strong>{" "}
              {studentResult.Details.COLLEGE_CODE}
            </div>
          </div>
        )}
        {semesters.map((semester, index) => (
          <ResultsTable
            key={semester}
            subjects={JNTUHService.getSemesterSubjects(results, semester)}
            semesterNumber={semester}
            gpa={JNTUHService.getSemesterGPA(results, semester)}
            semesterData={results[semester] as SemesterResult}
            showAd={(index + 1) % 2 === 0} // Show ad after every 2nd semester
          />
        ))}
        <div className="mt-6 text-center">
          <h2 className="text-xl font-bold">Overall CGPA: {results.Total}</h2>
        </div>
        <div className="watermark">https://jntuhresults.theskypedia.com</div>
      </div>
      {/* Bottom Ad */}
      <AdBanner adSlot="8973292958" adFormat="horizontal" className="mt-6" />
      <Button onClick={handlePrint} className="mb-4">
        Print Results
      </Button>
    </div>
  );
};

export default StudentResultsTables;
