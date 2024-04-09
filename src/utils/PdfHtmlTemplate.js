export const generateHtmlContent = (studentName, selectedMonth, currentDate) => `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    body {
      font-family: Arial, sans-serif;
    }
    .heading {
      text-align: center;
      margin-top: 60px;
      margin-bottom: 100px;
    }
    .table {
      margin: 0 auto;
      border-collapse: collapse;
      width: 80%;
    }
    th, td {
      border: 1px solid #000;
      padding: 8px;
      text-align: center;
    }
    .grey-bg {
      background-color: #bebebe;
    }
  </style>
</head>
<body>
  <h1 class="heading">Fee Slip</h1>
  <table class="table">
    <thead>
      <tr class="grey-bg">
        <th>Student Name</th>
        <th>Month</th>
        <th>Fee Receiving Date</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>${studentName}</td>
        <td>${selectedMonth}</td>
        <td>${currentDate}</td>
      </tr>
    </tbody>
  </table>
</body>
</html>
`;
