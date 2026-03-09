<?php
if (isset($_POST['course'], $_POST['credits'], $_POST['grade'])) {
    $courses = $_POST['course'];
    $credits = $_POST['credits'];
    $grades = $_POST['grade'];
    
    $totalPoints = 0;
    $totalCredits = 0;

    echo "<h1>GPA Result</h1>";
    echo "<table>";
    echo "<tr>
            <th>Course</th>
            <th>Credits</th>
            <th>Grade Points</th>
            <th>Total Points</th>
          </tr>";

    // حلقة تكرارية لمعالجة كل مادة على حدة [cite: 275]
    for ($i = 0; $i < count($courses); $i++) {
        $courseName = htmlspecialchars($courses[$i]);
        $cr = floatval($credits[$i]);
        $g = floatval($grades[$i]);

        if ($cr <= 0) continue; // تخطي المواد ذات الساعات الصفرية [cite: 279]

        $pts = $cr * $g; // حساب نقاط المادة (الساعات × الدرجة) [cite: 282]
        $totalPoints += $pts;
        $totalCredits += $cr;

        echo "<tr>
                <td>$courseName</td>
                <td>$cr</td>
                <td>$g</td>
                <td>$pts</td>
              </tr>";
    }
    echo "</table>";

    // حساب المعدل النهائي إذا كان إجمالي الساعات أكبر من صفر [cite: 307-309]
    if ($totalCredits > 0) {
        $gpa = $totalPoints / $totalCredits;

        // تحديد التقدير بناءً على قيمة المعدل [cite: 310-329]
        if ($gpa >= 3.7) {
            $interpretation = "Distinction";
        } elseif ($gpa >= 3.0) {
            $interpretation = "Merit";
        } elseif ($gpa >= 2.0) {
            $interpretation = "Pass";
        } else {
            $interpretation = "Fail";
        }

        echo "<p>Your GPA is <strong>" . number_format($gpa, 2) . "</strong> ($interpretation).</p>";
    } else {
        echo "<p>No valid courses entered.</p>";
    }
} else {
    echo "Data not received.";
}
?>sc
