
      // Configure PDF.js worker - use workerSrc with a fallback
      if (typeof pdfjsLib !== 'undefined') {
        pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';
      }
      // Polyfill: if worker fails, fall back to fake worker (slower but works)
      window.addEventListener('error', function(e) {
        if (e.filename && e.filename.includes('pdf.worker')) {
          console.warn('PDF worker failed to load, using fake worker');
          if (typeof pdfjsLib !== 'undefined') {
            pdfjsLib.GlobalWorkerOptions.workerSrc = '';
          }
        }
      });
    


      $(function () {
        let courses = null;

        // ============================================================
        // COURSE TYPE CLASSIFICATION SYSTEM
        // ============================================================
        const ELECTIVE_COURSES = [
          'HU402',  // Fundamental of Management
          'HU427',  // Entrepreneurship
          'HU101',  // Micro Economics
          'HU112',  // Creative and Scientific Thinking
          'HU113',  // Human Rights (HU113)
          'HU413',  // Human Rights (HU413 - alternate code)
          'HU111'   // Technical Report Writing
        ];

        const PROJECT_COURSES = ['PC401', 'PC402'];
        const SUMMER_TRAINING = 'TR';

        // Helper functions to classify courses
        function isElectiveCourse(courseCode) {
          return ELECTIVE_COURSES.includes(courseCode);
        }

        function isProjectCourse(courseCode) {
          return PROJECT_COURSES.includes(courseCode);
        }

        function isSummerTraining(courseCode) {
          return courseCode === SUMMER_TRAINING;
        }
       
        const ai_courses = {
          //Sem1
          IT111: {
            name: "Electronics",
            semester: 1,
            prerequisites: [],
            hours: 3,
            isTheoretical: true,
          },
          MA111: {
            name: "Mathematics1",
            semester: 1,
            prerequisites: [],
            hours: 3,
            isTheoretical: true,
          },
          HU111: {
            name: "Technical Report Writing",
            semester: 1,
            prerequisites: [],
            hours: 2,
            isTheoretical: true,
          },
          HU113: {
            name: "Human Rights",
            semester: 1,
            prerequisites: [],
            hours: 2,
            isTheoretical: true,
          },
          MA112: {
            name: "Discrete Math",
            semester: 1,
            prerequisites: [],
            hours: 3,
            isTheoretical: true,
          },
          IT110: {
            name: "Introduction to Computers",
            semester: 1,
            prerequisites: [],
            hours: 3,
            isTheoretical: true,
          },
          //Sem2
          ST121: {
            name: "Probability and Statistics-1",
            semester: 2,
            prerequisites: ["MA111"],
            hours: 3,
            isTheoretical: true,
          },
          HU112: {
            name: "Creative and Scientific Thinking",
            semester: 2,
            prerequisites: [],
            hours: 2,
            isTheoretical: true,
          },
          MA113: {
            name: "Mathematics-2",
            semester: 2,
            prerequisites: ["MA111"],
            hours: 3,
            isTheoretical: true,
          },
          HU101: {
            name: "Micro Economics",
            semester: 2,
            prerequisites: [],
            hours: 2,
            isTheoretical: true,
          },
          IT113: {
            name: "Logic Design",
            semester: 2,
            prerequisites: ["IT111"],
            hours: 3,
            isTheoretical: true,
          },
          IT114: {
            name: "Programming Techniques",
            semester: 2,
            prerequisites: ["IT110"],
            hours: 3,
            isTheoretical: true,
          },

          // Second Year
          //Sem3
          IT215: {
            name: "Object Oriented Programing",
            semester: 3,
            prerequisites: ["IT114"],
            hours: 3,
            isTheoretical: true,
          },
          DS211: {
            name: "Introduction to Database systems",
            semester: 3,
            prerequisites: ["IT114"],
            hours: 3,
            isTheoretical: true,
          },
          MA214: {
            name: "Mathematics-3 ",
            semester: 3,
            prerequisites: ["MA113"],
            hours: 3,
            isTheoretical: true,
          },
          IT231: {
            name: "Computer Networks Technology",
            semester: 3,
            prerequisites: ["IT110"],
            hours: 3,
            isTheoretical: true,
          },
          ST222: {
            name: "Probability and Statistics-2",
            semester: 3,
            prerequisites: ["ST121"],
            hours: 3,
            isTheoretical: true,
          },
          CS240: {
            name: "Introduction to Software Engineering",
            semester: 3,
            prerequisites: ["IT114"],
            hours: 3,
            isTheoretical: true,
          },

          //Sem 4
          IT217: {
            name: "Introduction to Operation Research",
            semester: 4,
            prerequisites: ["ST121", "IT114"],
            hours: 3,
            isTheoretical: true,
          },
          IT216: {
            name: "Data Structure",
            semester: 4,
            prerequisites: ["IT215"],
            hours: 3,
            isTheoretical: true,
          },
          AI321: {
            name: "Machine Learning Fundamentals",
            semester: 4,
            prerequisites: ["MA214", "ST222"],
            hours: 3,
            isTheoretical: true,
          },
          IT230: {
            name: "Web Technology",
            semester: 4,
            prerequisites: ["IT215"],
            hours: 3,
            isTheoretical: true,
          },
          HU427: {
            name: "Entrepreneurship",
            semester: 4,
            prerequisites: [],
            hours: 2,
            isTheoretical: true,
          },

          LB211: {
            name: "Networking Fundamentals lab",
            semester: 4,
            prerequisites: ["IT231"],
            hours: 2,
            isTheoretical: false,
          },

          //Third year

          AI341: {
            name: "Computer Vision",
            semester: 5,
            prerequisites: ["IT215"],
            hours: 3,
            isTheoretical: true,
          },
          AI311: {
            name: "Artificial intelligence",
            semester: 5,
            prerequisites: ["IT216"],
            hours: 3,
            isTheoretical: true,
          },
          CS319: {
            name: "Operating Systems",
            semester: 5,
            prerequisites: ["IT216"],
            hours: 3,
            isTheoretical: true,
          },
          AI213: {
            name: "Computational mathematics for learning and data analysis",
            semester: 5,
            prerequisites: ["MA214", "ST222"],
            hours: 3,
            isTheoretical: true,
          },
          IT318: {
            name: "Computer Organization",
            semester: 5,
            prerequisites: ["IT113", "IT216"],
            hours: 3,
            isTheoretical: true,
          },
          IT341: {
            name: "Algorithms analysis and Design",
            semester: 5,
            prerequisites: ["IT216"],
            hours: 3,
            isTheoretical: true,
          },

          //Sem 6

          AI331: {
            name: "Reinforcement and Deep Learning",
            semester: 6,
            prerequisites: ["AI321"],
            hours: 3,
            isTheoretical: true,
          },
          AI342: {
            name: "Natural Languages Processing",
            semester: 6,
            prerequisites: ["AI321"],
            hours: 3,
            isTheoretical: true,
          },
          AI343: {
            name: "AI Systems Design and Implementation",
            semester: 6,
            prerequisites: ["AI321"],
            hours: 3,
            isTheoretical: true,
          },
          AI351: {
            name: "Intelligent Autonomous Robotics",
            semester: 6,
            prerequisites: ["IT113"],
            hours: 3,
            isTheoretical: true,
          },
          AI361: {
            name: "Big Data",
            semester: 6,
            prerequisites: ["AI213"],
            hours: 3,
            isTheoretical: true,
          },

          // Fourth year

          AI41X: {
            name: "Image Processing",
            semester: 7,
            prerequisites: [],
            hours: 3,
            isTheoretical: true,
          },
          AI48X: {
            name: "Bioinformatics Systems",
            semester: 7,
            prerequisites: [],
            hours: 3,
            isTheoretical: true,
          },
          AI4X1: {
            name: "Artificial intelligence for Cybersecurity",
            semester: 7,
            prerequisites: [],
            hours: 3,
            isTheoretical: true,
          },
          AI212: {
            name: "Reasoning and Knowledge Representation",
            semester: 7,
            prerequisites: ["MA214", "ST222"],
            hours: 3,
            isTheoretical: true,
          },
          LB496: {
            name: "Advanced Machine Learning lab",
            semester: 7,
            prerequisites: [],
            hours: 3,
            isTheoretical: false,
          },
          PC401: {
            name: "Graduation Project",
            semester: 7,
            prerequisites: [],
            hours: 3,
            isTheoretical: false,
          },

          // Sem 8

          AI43X: {
            name: "Elective 4",
            semester: 8,
            prerequisites: [],
            hours: 3,
            isTheoretical: true,
          },
          AI46X: {
            name: "Elective 5",
            semester: 8,
            prerequisites: [],
            hours: 3,
            isTheoretical: true,
          },
          LB497: {
            name: "AI Cloud Services lab",
            semester: 8,
            prerequisites: [],
            hours: 3,
            isTheoretical: false,
          },
          HU402: {
            name: "Fundamental of Management",
            semester: 8,
            prerequisites: [],
            hours: 3,
            isTheoretical: true,
          },
          LB431: {
            name: "Selected labs in AI ",
            semester: 8,
            prerequisites: ["AI311"],
            hours: 3,
            isTheoretical: false,
          },
          PC402: {
            name: "Graduation Project",
            semester: 8,
            prerequisites: [],
            hours: 3,
            isTheoretical: false,
          },
          // Additional courses
          TR: {
            name: "Summer Training",
            semester: 0,
            prerequisites: [],
            hours: 2,
            isTheoretical: false,
          },
          BMA001: {
            name: "Mathematics-0",
            semester: 0,
            prerequisites: [],
            hours: 0,
            isTheoretical: true,
          },
        };

        const it_courses = {
          //Sem1
          IT111: {
            name: "Electronics",
            semester: 1,
            prerequisites: [],
            hours: 3,
            isTheoretical: true,
          },
          MA111: {
            name: "Mathematics1",
            semester: 1,
            prerequisites: [],
            hours: 3,
            isTheoretical: true,
          },
          HU111: {
            name: "Technical Report Writing",
            semester: 1,
            prerequisites: [],
            hours: 2,
            isTheoretical: true,
          },
          HU413: {
            name: "Human Rights",
            semester: 1,
            prerequisites: [],
            hours: 2,
            isTheoretical: true,
          },
          MA112: {
            name: "Discrete Math",
            semester: 1,
            prerequisites: [],
            hours: 3,
            isTheoretical: true,
          },
          IT110: {
            name: "Introduction to Computers",
            semester: 1,
            prerequisites: [],
            hours: 3,
            isTheoretical: true,
          },
          //Sem2
          ST121: {
            name: "Probability and Statistics-1",
            semester: 2,
            prerequisites: ["MA111"],
            hours: 3,
            isTheoretical: true,
          },
          HU112: {
            name: "Creative and Scientific Thinking",
            semester: 2,
            prerequisites: [],
            hours: 2,
            isTheoretical: true,
          },
          MA113: {
            name: "Mathematics-2",
            semester: 2,
            prerequisites: ["MA111"],
            hours: 3,
            isTheoretical: true,
          },
          HU101: {
            name: "Micro Economics",
            semester: 2,
            prerequisites: [],
            hours: 2,
            isTheoretical: true,
          },
          IT113: {
            name: "Logic Design",
            semester: 2,
            prerequisites: ["IT111"],
            hours: 3,
            isTheoretical: true,
          },
          CS112: {
            name: "Programming Language",
            semester: 2,
            prerequisites: ["IT110"],
            hours: 3,
            isTheoretical: true,
          },

          // Second Year
          //Sem3
          CS215: {
            name: "Object Oriented Programing",
            semester: 3,
            prerequisites: ["CS112"],
            hours: 3,
            isTheoretical: true,
          },
          DS211: {
            name: "Introduction to Database systems",
            semester: 3,
            prerequisites: ["CS112"],
            hours: 3,
            isTheoretical: true,
          },
          MA214: {
            name: "Mathematics-3 ",
            semester: 3,
            prerequisites: ["MA113"],
            hours: 3,
            isTheoretical: true,
          },
          IT231: {
            name: "Computer Networks Technology",
            semester: 3,
            prerequisites: ["IT110"],
            hours: 3,
            isTheoretical: true,
          },
          ST222: {
            name: "Probability and Statistics-2",
            semester: 3,
            prerequisites: ["ST121"],
            hours: 3,
            isTheoretical: true,
          },
          CS240: {
            name: "Introduction to Software Engineering",
            semester: 3,
            prerequisites: ["CS112"],
            hours: 3,
            isTheoretical: true,
          },
          //Sem4
          IT217: {
            name: "Introduction to Operation Research",
            semester: 4,
            prerequisites: ["ST121", "CS112"],
            hours: 3,
            isTheoretical: true,
          },
          CS216: {
            name: "Data Structure",
            semester: 4,
            prerequisites: ["CS215"],
            hours: 3,
            isTheoretical: true,
          },
          AI321: {
            name: "Machine Learning Fundamentals",
            semester: 4,
            prerequisites: ["MA214" , "ST222"],
            hours: 3,
            isTheoretical: true,
          },
          IT230: {
            name: "Web Technology",
            semester: 4,
            prerequisites: ["CS215"],
            hours: 3,
            isTheoretical: true,
          },
          HU427: {
            name: "Entrepreneurship",
            semester: 4,
            prerequisites: [],
            hours: 2,
            isTheoretical: true,
          },
          LB211: {
            name: "Networking Fundamentals lab",
            semester: 4,
            prerequisites: ["IT231"],
            hours: 2,
            isTheoretical: false,
          },

          // Third year
          //Sem  5
          LB312: {
            name: "Network Routing and Switching-Lab",
            semester: 5,
            prerequisites: ["LB211"],
            hours: 2,
            isTheoretical: false,
          },
          AI311: {
            name: "Artificial intelligence",
            semester: 5,
            prerequisites: ["CS216"],
            hours: 3,
            isTheoretical: true,
          },
          CS319: {
            name: "Operating Systems",
            semester: 5,
            prerequisites: ["CS216"],
            hours: 3,
            isTheoretical: true,
          },
          IT212: {
            name: "Digital Signal Processing",
            semester: 5,
            prerequisites: ["MA214"],
            hours: 3,
            isTheoretical: true,
          },
          CS318: {
            name: "Computer Organization",
            semester: 5,
            prerequisites: ["IT113", "CS216"],
            hours: 3,
            isTheoretical: true,
          },
          CS341: {
            name: "Algorithms analysis and Design",
            semester: 5,
            prerequisites: ["CS216"],
            hours: 3,
            isTheoretical: true,
          },

          // Sem 6
          IT322: {
            name: "Pattern Recognition",
            semester: 6,
            prerequisites: ["IT212" , "ST222"],
            hours: 3,
            isTheoretical: true,
          },
          IT333: {
            name: "Information Computer Networks Security",
            semester: 6,
            prerequisites: ["IT231"],
            hours: 3,
            isTheoretical: true,
          },
          AI448: {
            name: "op-Natural Language Processing",
            semester: 6,
            prerequisites: ["AI321"],
            hours: 3,
            isTheoretical: true,
          },
          CS344: {
            name: "Advanced Software Engineering",
            semester: 6,
            prerequisites: ["CS240"],
            hours: 3,
            isTheoretical: true,
          },
          IT343: {
            name: "Microcontroller",
            semester: 6,
            prerequisites: ["IT231"],
            hours: 3,
            isTheoretical: true,
          },
          LB313: {
            name: "Ethical Hacking-lab",
            semester: 6,
            prerequisites: ["IT231"],
            hours: 2,
            isTheoretical: false,
          },

          //Fourth year
          // Sem 7

          LB421: {
            name: "Selected labs in Software Engineering",
            semester: 7,
            prerequisites: ["CS341", "CS344"],
            hours: 2,
            isTheoretical: false,
          },
          IT423: {
            name: "Embedded Systems",
            semester: 7,
            prerequisites: ["IT343"],
            hours: 3,
            isTheoretical: true,
          },
          IT221: {
            name: "Computer Graphics",
            semester: 7,
            prerequisites: ["CS215"],
            hours: 3,
            isTheoretical: true,
          },
          IT434: {
            name: "Advanced Computer Networks",
            semester: 7,
            prerequisites: ["IT231"],
            hours: 3,
            isTheoretical: true,
          },
          PC401: {
            name: "Project (1)",
            semester: 7,
            prerequisites: [],
            hours: 3,
            isTheoretical: false,
          },
          IT438: {
            name: "Communication Technology",
            semester: 7,
            prerequisites: ["IT231"],
            hours: 3,
            isTheoretical: true,
          },
          // Sem 8
          IT436:{
            name: "Cloud Computing Networking",
            semester: 8,
            prerequisites: ["IT434"],
            hours: 3,
            isTheoretical: true,
          },
          AI435: {
            name: "Semantic Web and ontology",
            semester: 8,
            prerequisites: ["AI311", "IT230"],
            hours: 3,
            isTheoretical: true,
          },
          IT439: {
            name: "Wireless and Mobile Networks",
            semester: 8,
            prerequisites: ["IT434"],
            hours: 3,
            isTheoretical: true,
          },
          HU402: {
            name: "Fundamental of Management",
            semester: 8,
            prerequisites: [],
            hours: 2,
            isTheoretical: true,
          },
          PC402: {
            name: "Project (2)",
            semester: 8,
            prerequisites: ["PC401"],
            hours: 3,
            isTheoretical: false,
          },
          LB431: {
            name: "Selected labs in AI",
            semester: 8,
            prerequisites: ["AI311"],
            hours: 2,
            isTheoretical: false,
          },
          // Additional courses
          TR: {
            name: "Summer Training",
            semester: 0,
            prerequisites: [],
            hours: 2,
            isTheoretical: false,
          },
          BMA001: {
            name: "Mathematics-0",
            semester: 0,
            prerequisites: [],
            hours: 0,
            isTheoretical: true,
          },
        };

        function populateCourses(cs) {
          let coursesTable = document.querySelector("#courses_table");
          coursesTable.innerHTML = "";
          courses = cs;
          Object.keys(courses).forEach(function (c) {
            let key = c;
            let course = courses[c];
            addCourse(key, course);
            var prerequisites = courses[c].prerequisites;
            for (var pre of prerequisites) {
              if (!courses[pre].nextCourses) {
                courses[pre].nextCourses = [];
              }
              courses[pre].nextCourses.push(c);
            }
          });
          selected = [];
          $(".course").click(function () {
            var code = this.id;
            if (!document.querySelector("#selectMulti").checked) {
              //multiple course selection is disabled
              selected = [code];
              $(".course").removeClass("prev");
              $(".course").removeClass("direct");
              $(".course").removeClass("selected");
              $(".course").removeClass("next");
              markDependency(code, 0);
            } else {
              if (selected.indexOf(code) > -1) {
                //selected course; remove it
                unselect(code);
              } else {
                select(code);
              }
            }
            markNextCourses();
            showSelected();
            
            // Auto-scroll to show the selected course and related courses
            autoScrollToCourse(code);

            // ── Live update: when multi-select is on, treat clicks as marking
            //    courses completed → refresh stats, remaining courses, and study plan
            if (document.querySelector("#selectMulti").checked) {
              // Show + update stats container
              const statsContainer = document.getElementById('statsContainer');
              if (statsContainer) {
                statsContainer.style.display = 'grid';
                calculateStatistics();
              }
              // Show + refresh remaining courses
              const remainingDiv = document.getElementById('remainingCourses');
              if (remainingDiv) {
                remainingDiv.style.display = 'block';
                showRemainingCourses();
              }
              // Show study plan generator button if hidden
              const planContainer = document.getElementById('studyPlanContainer');
              if (planContainer) {
                planContainer.style.display = 'block';
              }
              // If a plan has already been generated, re-display it so the
              // newly completed/uncompleted course is reflected immediately.
              if (generatedPlans.length > 0) {
                displayStudyPlan(currentPlanIndex);
              }
            }
          });
        }
        populateCourses(it_courses);

        var selected = [];
        var courseGrades = {}; // Store grades for each course
        var courseAttempts = {}; // Store number of attempts for each course

        $("#selectMulti").click(function () {
          selected = [];
          courseGrades = {}; // Clear grades
          courseAttempts = {}; // Clear attempts
          $(".course").removeClass("prev");
          $(".course").removeClass("direct");
          $(".course").removeClass("selected");
          $(".course").removeClass("next");
          $(".grade-badge").remove(); // Remove all grade badges
          $(".attempts-badge").remove(); // Remove all attempts badges
          showSelected();
          if (this.checked) {
            $("#legend tr:nth-child(2), #legend tr:nth-child(3)").hide();
          } else {
            $("#legend tr:nth-child(2), #legend tr:nth-child(3)").show();
          }
        });

        function select(code, grade, attempts) {
          selected.push(code);
          $("#" + code).addClass("selected");
          
          console.log(`=== SELECT FUNCTION ===`);
          console.log(`Code: ${code}, Grade: ${grade}, Attempts: ${attempts}`);
          
          // Store and display grade if provided
          if (grade) {
            courseGrades[code] = grade;
            courseAttempts[code] = attempts || 1;
            addBadgesToCourse(code, grade, attempts);
          }
        }
        
        // Helper function to add badges to a course (without selecting it)
        function addBadgesToCourse(code, grade, attempts) {
          const gradeColor = getGradeColor(grade);
          console.log(`Grade color: ${gradeColor}`);
          
          // Build the badge HTML
          let badgeHTML = `<span class="grade-badge" style="background-color: ${gradeColor}; color: white; padding: 2px 6px; border-radius: 3px; font-size: 11px; margin-left: 5px; font-weight: bold;">${grade}</span>`;
          
          // Add attempts badge if more than 1
          if (attempts > 1) {
            console.log(`Adding attempts badge: ×${attempts}`);
            badgeHTML += `<span class="attempts-badge" style="background-color: #dc2626; color: white; padding: 2px 6px; border-radius: 3px; font-size: 10px; margin-left: 3px; font-weight: bold;">×${attempts}</span>`;
          }
          
          console.log(`Badge HTML: ${badgeHTML}`);
          console.log(`Element #${code} exists: ${$("#" + code).length > 0}`);
          console.log(`Element current text: "${$("#" + code).text()}"`);
          
          // Remove existing badges if any
          $("#" + code + " .grade-badge").remove();
          $("#" + code + " .attempts-badge").remove();
          
          // Add new badges
          $("#" + code).append(badgeHTML);
          
          console.log(`After append, element text: "${$("#" + code).text()}"`);
          console.log(`After append, element HTML: "${$("#" + code).html()}"`);
        }
        
        function getGradeColor(grade) {
          const gradeColors = {
            'A+': '#10b981', 'A': '#34d399',
            'B+': '#3b82f6', 'B': '#60a5fa',
            'C+': '#f59e0b', 'C': '#fbbf24',
            'D+': '#ef4444', 'D': '#f87171',
            'P': '#8b5cf6', 'contd': '#6b7280',
            'F': '#991b1b', 'Fr': '#991b1b', 'Abs': '#991b1b', 'NP': '#991b1b'
          };
          return gradeColors[grade] || '#6b7280';
        }

        function unselect(code) {
          selected.splice(selected.indexOf(code), 1);
          $("#" + code).removeClass("selected");
          
          // Remove grade and attempts badges
          $("#" + code + " .grade-badge").remove();
          $("#" + code + " .attempts-badge").remove();
          delete courseGrades[code];
          delete courseAttempts[code];

          if (!courses[code].nextCourses) return;

          for (var i = 0; i < courses[code].nextCourses.length; i++) {
            var nxt = courses[code].nextCourses[i];
            if (selected.indexOf(nxt) > -1) {
              unselect(nxt);
            }
          }
        }

        function showSelected() {
          var credits = 0;
          for (var c of selected) {
            credits += courses[c].hours;
          }

          //$("#div_sel").html("Selected credit hours: " + credits);
        }

        function markDependency(start, level) {
          switch (level) {
            case 0:
              $("#" + start).addClass("selected");
              break;
            case 1:
              $("#" + start).addClass("direct");
              break;
            default:
              $("#" + start).addClass("prev");
              break;
          }

          for (var dep of courses[start].prerequisites) {
            markDependency(dep, level + 1);
          }
        }

        function markNextCourses() {
          $(".course").removeClass("next");
          for (var s of selected) {
            if (!courses[s].nextCourses) continue;
            for (var next of courses[s].nextCourses) {
              if (selected.indexOf(next) == -1) $("#" + next).addClass("next");
            }
          }
        }

        function autoScrollToCourse(courseCode) {
          const courseElement = document.getElementById(courseCode);
          if (!courseElement) return;
          
          // Get all highlighted courses (selected, direct, prev, next)
          const highlightedCourses = document.querySelectorAll('.course.selected, .course.direct, .course.prev, .course.next');
          
          if (highlightedCourses.length === 0) return;
          
          // Find the topmost and bottommost highlighted courses
          let topMostElement = courseElement;
          let bottomMostElement = courseElement;
          let topMostPosition = courseElement.getBoundingClientRect().top;
          let bottomMostPosition = courseElement.getBoundingClientRect().bottom;
          
          highlightedCourses.forEach(course => {
            const rect = course.getBoundingClientRect();
            if (rect.top < topMostPosition) {
              topMostPosition = rect.top;
              topMostElement = course;
            }
            if (rect.bottom > bottomMostPosition) {
              bottomMostPosition = rect.bottom;
              bottomMostElement = course;
            }
          });
          
          // Calculate if we need to scroll
          const viewportHeight = window.innerHeight;
          const headerHeight = 80; // Height of fixed header
          const scrollPadding = 20; // Extra padding for comfort
          
          // Check if all highlighted courses are visible
          const topVisible = topMostPosition >= headerHeight + scrollPadding;
          const bottomVisible = bottomMostPosition <= viewportHeight - scrollPadding;
          
          if (!topVisible || !bottomVisible) {
            // Calculate the center point between topmost and bottommost courses
            const centerY = (topMostElement.getBoundingClientRect().top + bottomMostElement.getBoundingClientRect().bottom) / 2;
            const currentScroll = window.pageYOffset || document.documentElement.scrollTop;
            const targetScroll = currentScroll + centerY - (viewportHeight / 2);
            
            // Smooth scroll to center the highlighted courses
            window.scrollTo({
              top: Math.max(0, targetScroll),
              behavior: 'smooth'
            });
          }
        }

        // Sequential auto-scroll after upload completion
        function autoScrollAfterUpload() {
          // Helper function to scroll to an element smoothly
          function scrollToElement(elementId, duration = 1500) {
            return new Promise((resolve) => {
              const element = document.getElementById(elementId);
              if (!element) {
                resolve();
                return;
              }
              
              const targetPosition = element.getBoundingClientRect().top + window.pageYOffset - 100;
              const startPosition = window.pageYOffset;
              const distance = targetPosition - startPosition;
              let startTime = null;

              function animation(currentTime) {
                if (startTime === null) startTime = currentTime;
                const timeElapsed = currentTime - startTime;
                const run = ease(timeElapsed, startPosition, distance, duration);
                window.scrollTo(0, run);
                if (timeElapsed < duration) {
                  requestAnimationFrame(animation);
                } else {
                  resolve();
                }
              }

              // Easing function for smooth animation
              function ease(t, b, c, d) {
                t /= d / 2;
                if (t < 1) return c / 2 * t * t + b;
                t--;
                return -c / 2 * (t * (t - 2) - 1) + b;
              }

              requestAnimationFrame(animation);
            });
          }

          // Execute scroll sequence
          async function scrollSequence() {
            // Wait a bit for DOM to update
            await new Promise(resolve => setTimeout(resolve, 300));
            
            // 1. Scroll up to show courses table
            await scrollToElement('courses_table', 1200);
            await new Promise(resolve => setTimeout(resolve, 800));
            
            // 2. Scroll down to show statistics
            await scrollToElement('statsContainer', 1000);
            await new Promise(resolve => setTimeout(resolve, 600));
            
            // 3. Scroll to show remaining courses
            await scrollToElement('remainingCourses', 1000);
            await new Promise(resolve => setTimeout(resolve, 600));
            
            // 4. Scroll to show study plan generator button
            await scrollToElement('studyPlanContainer', 1000);
          }

          scrollSequence();
        }

        // Auto-scroll when study plan is generated (once only)
        function autoScrollToStudyPlan() {
          if (!window._planJustGenerated) return; // Only scroll on fresh generation
          window._planJustGenerated = false;       // Clear flag immediately
          setTimeout(() => {
            const planDisplay = document.getElementById('studyPlanDisplay');
            if (planDisplay && planDisplay.children.length > 0) {
              planDisplay.scrollIntoView({ 
                behavior: 'smooth', 
                block: 'start'
              });
            }
          }, 300);
        }

        function addCourse(id, course) {
          const rowId = course.semester === 0 ? "additional-courses" : `semester-${course.semester}`;
          let semesterRow = document.querySelector(`#${rowId}`);
          if (semesterRow == null) {
            let coursesTable = document.querySelector("#courses_table");
            semesterRow = document.createElement("tr");
            semesterRow.id = rowId;
            let td = document.createElement("td");
            td.className = "header";
            td.textContent = course.semester === 0 ? "Additional Courses" : `Semester ${course.semester}`;
            semesterRow.appendChild(td);
            coursesTable.appendChild(semesterRow);
          }
          course_td = document.createElement("td");
          course_td.setAttribute("id", id);
          course_td.className = "course";
          course_td.textContent = course.name;
          // Make draggable for study plan
          course_td.draggable = true;
          course_td.dataset.courseCode = id;
          course_td.addEventListener('dragstart', function(e) {
            draggedElement = e.target;
            draggedCourseCode = id;
            draggedFromSemester = -1;
            e.dataTransfer.effectAllowed = 'move';
            e.dataTransfer.setData('text/plain', id);
            e.target.style.opacity = '0.6';
          });
          course_td.addEventListener('dragend', function(e) {
            e.target.style.opacity = '';
            draggedCourseCode = null;
            draggedFromSemester = null;
            draggedElement = null;
          });
          semesterRow.appendChild(course_td);
        }

        $(".program").click((ev) => {
          let it = document.querySelector("#it");
          let ai = document.querySelector("#ai");
        
          it.classList.remove("active");
          ai.classList.remove("active");
         

          ev.target.classList.add("active");

          if (ev.target.id === "it") {
            console.log("it selected");
            populateCourses(it_courses);
          } else if (ev.target.id === "ai") {
            console.log("ai selected");
            populateCourses(ai_courses);
          } 
        });

        // ========================================
        // PDF AUTO-SELECTION FUNCTIONALITY
        // ========================================

        function addDebugLog(message, type = 'info') {
          const timestamp = new Date().toLocaleTimeString();
          const prefix = type === 'success' ? '✅' : 
                        type === 'error' ? '❌' : 
                        type === 'warning' ? '⚠️' : 'ℹ️';
          console.log(`[${timestamp}] ${prefix} ${message}`);
        }

        // Course name normalization for matching
        function normalizeName(name) {
          if (!name) return '';
          return name.toLowerCase()
            .replace(/[^a-z0-9\s]/g, ' ')  // Remove special chars
            .replace(/\s+/g, ' ')          // Normalize spaces
            .trim();
        }

        // Remove filler words
        function removeFillers(name) {
          const fillers = ['and', 'the', 'of', 'to', 'in', 'systems', 'system', 'a', 'an'];
          return name.split(' ').filter(word => !fillers.includes(word)).join(' ');
        }

        // Calculate similarity between two strings
        function similarity(s1, s2) {
          const longer = s1.length > s2.length ? s1 : s2;
          const shorter = s1.length > s2.length ? s2 : s1;
          if (longer.length === 0) return 1.0;
          const editDistance = levenshteinDistance(longer, shorter);
          return (longer.length - editDistance) / longer.length;
        }

        function levenshteinDistance(s1, s2) {
          const costs = [];
          for (let i = 0; i <= s1.length; i++) {
            let lastValue = i;
            for (let j = 0; j <= s2.length; j++) {
              if (i === 0) {
                costs[j] = j;
              } else if (j > 0) {
                let newValue = costs[j - 1];
                if (s1.charAt(i - 1) !== s2.charAt(j - 1)) {
                  newValue = Math.min(Math.min(newValue, lastValue), costs[j]) + 1;
                }
                costs[j - 1] = lastValue;
                lastValue = newValue;
              }
            }
            if (i > 0) costs[s2.length] = lastValue;
          }
          return costs[s2.length];
        }

        // Smart course matching
        function matchCourse(pdfCourseName, pdfCourseCode) {
                  // ═══ SPECIAL CASES - HIGH PRIORITY ═══
                  if (pdfCourseName) {
                    const name = pdfCourseName.toLowerCase();
                    
                    // Computer Graphics → IT221
                    if ((name.includes('computer graphics') || name.includes('graphics') || 
                         name.includes('رسومات') || name.includes('جرافيك')) && courses['IT221']) {
                      addDebugLog(`🎨 Special: Computer Graphics → IT221`, 'success');
                      return { code: 'IT221', name: courses['IT221'].name, score: 1.0 };
                    }
                    
                    // Data Structure → CS216
                    if ((name.includes('data structure') || name.includes('هياكل البيانات') || 
                         name.includes('هيكل بيانات')) && courses['CS216']) {
                      addDebugLog(`📊 Special: Data Structure → CS216`, 'success');
                      return { code: 'CS216', name: courses['CS216'].name, score: 1.0 };
                    }
                    
                    // Algorithms → CS341
                    if ((name.includes('algorithm') || name.includes('خوارزميات')) && courses['CS341']) {
                      addDebugLog(`🔢 Special: Algorithms → CS341`, 'success');
                      return { code: 'CS341', name: courses['CS341'].name, score: 1.0 };
                    }
                    
                    // Operating Systems → CS319
                    if ((name.includes('operating system') || name.includes('نظم تشغيل')) && courses['CS319']) {
                      addDebugLog(`💻 Special: OS → CS319`, 'success');
                      return { code: 'CS319', name: courses['CS319'].name, score: 1.0 };
                    }
                  }
                  
                  // ═══ CONTINUE WITH NORMAL MATCHING ═══
                  // Step 1: Normalize - remove ALL whitespace AND convert Arabic presentation forms
                  const normalizedCode = normalizeArabicChars(
                    pdfCourseCode.replace(/\s+/g, '').trim()
                  );
          
                  addDebugLog(`🔍 Matching: Original="${pdfCourseCode}" → Normalized="${normalizedCode}"`, 'info');
          
                  // Known code aliases
                  const codeAliases = {
                    'HU113': 'HU413',
                    'IT240': 'CS240',
                    'CS240': 'IT240',
                  };
          
                  // Try alias first
                  const aliasCode = codeAliases[normalizedCode];
                  if (aliasCode && courses[aliasCode]) {
                    addDebugLog(`✅ Alias match: "${normalizedCode}" → "${aliasCode}"`, 'success');
                    return { code: aliasCode, name: courses[aliasCode].name, score: 1.0 };
                  }
          
                  // Try normalized code directly
                  if (courses[normalizedCode]) {
                    addDebugLog(`✅ Direct match: "${normalizedCode}"`, 'success');
                    return { code: normalizedCode, name: courses[normalizedCode].name, score: 1.0 };
                  }
          
                  // Try original code
                  if (courses[pdfCourseCode]) {
                    addDebugLog(`✅ Original match: "${pdfCourseCode}"`, 'success');
                    return { code: pdfCourseCode, name: courses[pdfCourseCode].name, score: 1.0 };
                  }

                  // ── COMPREHENSIVE Arabic Department Prefix Mapping ──
                  const arabicPrefixMap = {
                    // CS (Computer Science - علوم حاسب)
                    'علح': 'CS', 'حلع': 'CS', 'لحع': 'CS', 'عحل': 'CS',
                    'ﺢﻠﻋ': 'CS', 'ﻠﻋﺢ': 'CS', 'ﻋﻠﺣ': 'CS', 'ﻊﻠﺣ': 'CS',
            
                    // IT (Information Technology - تكنولوجيا المعلومات)
                    'تمع': 'IT', 'عمت': 'IT', 'معت': 'IT', 'تعم': 'IT',
                    'ﺘﻤﻋ': 'IT', 'ﻤﻋﺘ': 'IT', 'ﻌﻤﺗ': 'IT', 'ﻋﻤﺗ': 'IT',
            
                    // AI (Artificial Intelligence - ذكاء اصطناعي)
                    'ذكا': 'AI', 'اكذ': 'AI', 'كاذ': 'AI', 'ذاك': 'AI',
                    'ﺬﻛﺎ': 'AI', 'ﻛﺎﺫ': 'AI', 'ﺎﻛﺫ': 'AI',
                    
                    // MA (Mathematics - رياضيات)
                    'رضي': 'MA', 'يضر': 'MA', 'ضري': 'MA', 'رضم': 'MA', 'مضر': 'MA',
                    
                    // ST (Statistics - إحصاء)
                    'حصإ': 'ST', 'إحص': 'ST', 'صإح': 'ST',
                    
                    // HU (Humanities - إنسانيات)
                    'سنإ': 'HU', 'إنس': 'HU', 'نسإ': 'HU', 'نإس': 'HU',
                    
                    // LB (Laboratory - معمل)
                    'عم': 'LB', 'مع': 'LB', 'ﻌﻣ': 'LB', 'ﻣﻋ': 'LB',
                    
                    // PC (Project - مشروع)
                    'رشم': 'PC', 'مشر': 'PC', 'شمر': 'PC', 'رمش': 'PC'
                  };

                  addDebugLog(`🔤 Trying Arabic prefix matching for: "${normalizedCode}"`, 'info');

                  for (const [arabicKey, engPrefix] of Object.entries(arabicPrefixMap)) {
                    // ── Case 1: Arabic BEFORE digits ("علح216", "حلع216") ──
                    if (normalizedCode.startsWith(arabicKey)) {
                      const numbers = normalizedCode.slice(arabicKey.length).replace(/\D/g, '');
                      if (/^\d{3,4}$/.test(numbers)) {
                        const converted = engPrefix + numbers;
                        if (courses[converted]) {
                          addDebugLog(`✅ Arabic-first: "${pdfCourseCode}" → "${converted}" (${arabicKey}→${engPrefix})`, 'success');
                          return { code: converted, name: courses[converted].name, score: 1.0 };
                        } else {
                          addDebugLog(`⚠️ Tried ${converted} but not in courses`, 'warning');
                        }
                      }
                    }
            
                    // ── Case 2: Digits BEFORE Arabic ("221تمع", "221عمت") ──
                    if (normalizedCode.endsWith(arabicKey)) {
                      const numbers = normalizedCode.slice(0, -arabicKey.length).replace(/\D/g, '');
                      if (/^\d{3,4}$/.test(numbers)) {
                        const converted = engPrefix + numbers;
                        if (courses[converted]) {
                          addDebugLog(`✅ Number-first: "${pdfCourseCode}" → "${converted}" (${arabicKey}→${engPrefix})`, 'success');
                          return { code: converted, name: courses[converted].name, score: 1.0 };
                        } else {
                          addDebugLog(`⚠️ Tried ${converted} but not in courses`, 'warning');
                        }
                      }
                    }
                  }

                  // ── Number-Only Fallback with Name Similarity ──
                  const digits = normalizedCode.replace(/[^0-9]/g, '');
                  if (digits.length >= 3) {
                    addDebugLog(`🔢 Trying number fallback with digits: "${digits}"`, 'info');
                    let bestMatch = null;
                    let bestScore = 0;
            
                    for (const [code, course] of Object.entries(courses)) {
                      const codeDigits = code.replace(/[^0-9]/g, '');
                      if (codeDigits === digits) {
                        let score = 0.5; // base score for numeric match
                        if (pdfCourseName) {
                          score = similarity(
                            pdfCourseName.toLowerCase().trim(),
                            course.name.toLowerCase().trim()
                          );
                        }
                        if (score > bestScore) {
                          bestScore = score;
                          bestMatch = { code, name: course.name, score };
                        }
                      }
                    }
            
                    if (bestMatch && bestMatch.score >= 0.3) {
                      addDebugLog(`✅ Number fallback: "${normalizedCode}" → "${bestMatch.code}" (score: ${bestMatch.score.toFixed(2)})`, 'success');
                      return bestMatch;
                    }
                  }
          
                  // No match found
                  addDebugLog(`❌ No match found for: "${pdfCourseCode}"`, 'error');
                  return null;
                }

        // Check if grade is passing - EXPLICIT LIST ONLY
        function isPassingGrade(grade) {
          // ONLY these grades are passing - everything else is FAILING
          const passingGrades = ['A+', 'A', 'B+', 'B', 'C+', 'C', 'D+', 'D', 'P', 'contd'];
          const isPassing = passingGrades.includes(grade);
          
          // Explicit check for common failing grades to catch errors
          const failingGrades = ['F', 'Fr', 'Abs', 'NP', 'W', 'I'];
          if (failingGrades.includes(grade)) {
            return false; // Explicitly return false for known failing grades
          }
          
          return isPassing;
        }

        // Parse PDF and extract courses
        async function parsePDF(file) {
          try {
            addDebugLog('📄 Loading PDF file...', 'info');
            const arrayBuffer = await file.arrayBuffer();
            const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
            
            let fullText = '';
            for (let i = 1; i <= pdf.numPages; i++) {
              const page = await pdf.getPage(i);
              const textContent = await page.getTextContent();
              const pageText = textContent.items.map(item => item.str).join(' ');
              fullText += pageText + '\n';
            }

            addDebugLog('✅ PDF loaded successfully', 'success');
            return extractCoursesFromText(fullText);
          } catch (error) {
            addDebugLog(`❌ Error parsing PDF: ${error.message}`, 'error');
            return null;
          }
        }

        // ── Arabic Presentation-Form Normalizer ────────────────────────────
        // PDF.js often returns Arabic letters as Unicode Presentation Forms
        // (range U+FE70–U+FEFF) rather than base Arabic (U+0600–U+06FF).
        // This function maps every relevant presentation-form codepoint back
        // to its base character so later string comparisons work correctly.
        //
        // Additionally, PDF.js reads RTL columns visually left-to-right, so a
        // 3-letter Arabic prefix like علح arrives character-by-character in
        // REVERSED order: ح ل ع  (HAH LAM AIN instead of AIN LAM HAH).
        // We therefore store BOTH orderings in arabicPrefixMap.
        function normalizeArabicChars(text) {
          // Map every Presentation-Form-B glyph we care about to its base char.
          // Keyed by the exact codepoints that appeared in this student's PDF
          // (confirmed via Unicode inspection of the PDF.js output).
          const presFormMap = {
            // HAH (ح  U+062D) ─ all four contextual forms
            '\uFEA1':'\u062D','\uFEA2':'\u062D','\uFEA3':'\u062D','\uFEA4':'\u062D',
            // TEH (ت  U+062A) ─ all four contextual forms
            '\uFE95':'\u062A','\uFE96':'\u062A','\uFE97':'\u062A','\uFE98':'\u062A',
            // AIN (ع  U+0639) ─ all four contextual forms
            '\uFEC9':'\u0639','\uFECA':'\u0639','\uFECB':'\u0639','\uFECC':'\u0639',
            // LAM (ل  U+0644) ─ all four contextual forms (FEE0 = medial, confirmed)
            '\uFEDB':'\u0644','\uFEDC':'\u0644','\uFEDD':'\u0644','\uFEDE':'\u0644',
            '\uFEDF':'\u0644','\uFEE0':'\u0644',
            // MEEM (م U+0645) ─ all four contextual forms
            '\uFEE1':'\u0645','\uFEE2':'\u0645','\uFEE3':'\u0645','\uFEE4':'\u0645',
          };
          return text.replace(/[\uFE70-\uFEFF]/g, ch => presFormMap[ch] || ch);
        }

        // Extract courses from text
        function extractCoursesFromText(rawText) {
          // ── STEP 0: Normalize Arabic Presentation Forms → base chars ─────────
          // Must happen BEFORE any regex so that Arabic codes like
          // "216ﺢﻠﻋ" become "216حلع" and can then be matched.
          const text = normalizeArabicChars(rawText);
          addDebugLog('🔤 Arabic presentation-form normalization applied', 'info');

          const courses = [];
          
          // VALID GRADES - removed "0" as it's النقاط not التقدير!
          const gradePattern = 'A\\+|B\\+|C\\+|D\\+|Abs|Fr|NP|contd|A|B|C|D|F|P';
          
          // ── Combined course-code capture group ────────────────────────────────
          // After normalizeArabicChars() above, presentation-form chars have been
          // converted to base Arabic (U+0600-U+06FF).  We ALSO include the
          // presentation-form range (U+FE70-U+FEFF) as a safety net in case any
          // stray glyphs were not in our normalisation map.
          //
          // PDF.js reads RTL columns LTR, so a 3-letter Arabic prefix arrives
          // REVERSED: "علح" (AIN-LAM-HAH) is extracted as "حلع" (HAH-LAM-AIN).
          // The matchCourse function handles this via reversed keys in arabicPrefixMap.
          const arabicChars = '[\\u0600-\\u06FF\\uFE70-\\uFEFF]';
          const codeCapture = 
            '[A-Z]{2,4}\\s?\\d{3,4}' +                        // English  e.g. IT111
            `|${arabicChars}{2,4}\\s?\\d{3,4}` +              // Arabic-first e.g. علح216 or حلع216
            `|\\d{3,4}\\s?${arabicChars}{2,4}` +              // Number-first e.g. 216علح or 216حلع ← RTL PDF
            '|TR|BMA\\d{3}';
          
          // Pattern 1: CODE NAME CREDITS MAX POINTS GRADE (normal order)
          // Example: MA112 Discrete Mathematics 3 100 2.2000 D+
          const pattern1 = new RegExp(`(${codeCapture})\\s+(.+?)\\s+\\d+\\s+[\\d.]+\\s+[\\d.]+\\s+(${gradePattern})(?=\\s|$)`, 'g');
          
          // Pattern 2: GRADE POINTS MAX CREDITS NAME CODE (reversed order)
          // Example: D+ 2.2000 100 3 Discrete Mathematics MA112
          // Also: D 2.0000 100 3 Data Structures 216 علح  (Arabic summer entry)
          const pattern2 = new RegExp(`(${gradePattern})(?=\\s)\\s+[\\d.]+\\s+[\\d.]+\\s+\\d+\\s+(.+?)\\s+(${codeCapture})`, 'g');
          
          // Pattern 3: NO GRADE - for currently registered courses
          // When التقدير is blank, the extracted text skips it entirely
          // Order becomes: POINTS MAX CREDITS NAME CODE
          // Example: 0 100 3 Pattern Recognition IT322
          // NOTE: MAX can be non-100 (e.g. 80 for projects, 120 for special courses)
          //       No ^ or $ anchors - PDF text is joined with spaces per page.
          //       Use (?:^|\s) to match standalone 0 (not part of a decimal like 2.0000)
          const pattern3 = new RegExp(`(?:^|\\s)(0)\\s+\\d+\\s+(\\d+)\\s+(.+?)\\s+(${codeCapture})(?=\\s|$)`, 'g');
          
          // Also handle reverse: CODE NAME CREDITS MAX POINTS (no grade)
          // Example: IT322 Pattern Recognition 3 100 0
          // MAX can vary (100, 80, 120) depending on course type
          const pattern4 = new RegExp(`(${codeCapture})\\s+(.+?)\\s+\\d+\\s+\\d+\\s+0(?:\\s|$)`, 'gm');
          
          let match;
          
          // Try pattern 1 (normal order WITH grade)
          while ((match = pattern1.exec(text)) !== null) {
            const [, code, name, grade] = match;
            courses.push({
              code: code.trim(),
              name: name.trim(),
              grade: grade.trim()
            });
            console.log(`📄 Extracted (P1-WithGrade): ${code.trim()} - ${name.trim()} - Grade: "${grade.trim()}"`);
          }
          
          // Try pattern 2 (reversed order WITH grade)
          while ((match = pattern2.exec(text)) !== null) {
            const [, grade, name, code] = match;
            courses.push({
              code: code.trim(),
              name: name.trim(),
              grade: grade.trim()
            });
            console.log(`📄 Extracted (P2-WithGrade): ${code.trim()} - ${name.trim()} - Grade: "${grade.trim()}"`);
          }
          
          // Try pattern 3 (NO grade - reversed order, التقدير missing)
          // Groups: [fullMatch, '0'(points), credits, name, code]
          while ((match = pattern3.exec(text)) !== null) {
            const [, , credits, name, code] = match;
            courses.push({
              code: code.trim(),
              name: name.trim(),
              grade: '' // No grade = empty string
            });
            console.log(`📄 Extracted (P3-NoGrade): ${code.trim()} - ${name.trim()} - Grade: "" (registered, no grade yet)`);
          }
          
          // Try pattern 4 (NO grade - normal order)
          while ((match = pattern4.exec(text)) !== null) {
            const [, code, name] = match;
            courses.push({
              code: code.trim(),
              name: name.trim(),
              grade: '' // No grade = empty string
            });
            console.log(`📄 Extracted (P4-NoGrade): ${code.trim()} - ${name.trim()} - Grade: "" (registered, no grade yet)`);
          }

          addDebugLog(`📊 Found ${courses.length} course entries in document (including duplicates and retakes)`, 'info');
          
          // Don't deduplicate here - return ALL courses including retakes
          // The autoSelectCourses function will handle deduplication and count attempts

          // Extract student info
          const studentInfo = {
            name: text.match(/اسم الطالب\s*:\s*([^\n]+)/)?.[1]?.trim(),
            id: text.match(/رقم الطالب\s*:\s*(\d+)/)?.[1]?.trim(),
            level: text.match(/المستوى\s*:\s*([^\n]+)/)?.[1]?.trim(),
            gpa: text.match(/المعدل التراكمي\s*:\s*(\d+\.\d+)/)?.[1]
          };
          
          return { courses: courses, studentInfo }; // Return ALL courses, not deduplicated
        }

        // Auto-select courses from PDF/Excel
        function autoSelectCourses(pdfCourses) {
          document.querySelector("#selectMulti").checked = true;
          selected = [];
          courseGrades = {}; // Clear grades
          courseAttempts = {}; // Clear attempts - will store ALL attempts (passing AND failing)
          $(".course").removeClass("prev direct selected next");
          $(".grade-badge").remove(); // Remove all existing grade badges
          $(".attempts-badge").remove(); // Remove all existing attempts badges

          const coursesByCode = {};
          
          // Separate completed courses from currently registered (no grade)
          const completedCourses = pdfCourses.filter(c => c.grade && c.grade.trim() !== '');
          
          // Deduplication guard: pattern3 can produce false-positive "no-grade" entries
          // for courses like IT438 (grade=F, points=0) because "F 0 100 3 name IT438"
          // also contains the sub-pattern "0 100 3 name IT438".
          // Discard any no-grade entry whose code also appears with a real grade.
          const completedCodes = new Set(completedCourses.map(c => c.code.replace(/\s+/g, '')));
          const rawRegistered = pdfCourses.filter(c => !c.grade || c.grade.trim() === '');
          const registeredCourses = rawRegistered.filter(c => 
            !completedCodes.has(c.code.replace(/\s+/g, ''))
          );
          
          if (registeredCourses.length > 0) {
            addDebugLog(`\n📌 CURRENTLY REGISTERED COURSES (${registeredCourses.length} courses - NO GRADES YET):`, 'warning');
            addDebugLog(`   ⚠️ These courses will NOT be marked as completed`, 'warning');
            addDebugLog(`   ✅ They will be treated as REMAINING courses in the study plan`, 'info');
            addDebugLog(`   📝 The study plan will start FROM the current semester`, 'info');
            registeredCourses.forEach(c => {
              addDebugLog(`   ⏳ ${c.code} - ${c.name}`, 'info');
            });
          }
          
          addDebugLog(`\n✅ PROCESSING ${completedCourses.length} COMPLETED COURSES:`, 'info');
          
          completedCourses.forEach(pdfCourse => {
            const code = pdfCourse.code;
            if (!coursesByCode[code]) {
              coursesByCode[code] = [];
            }
            coursesByCode[code].push(pdfCourse);
          });

          let matched = 0;
          let notMatched = 0;

          for (const [code, attempts] of Object.entries(coursesByCode)) {
            const gradeValue = {
              'A+': 10, 'A': 9, 'B+': 8, 'B': 7, 'C+': 6, 'C': 5,
              'D+': 4, 'D': 3, 'P': 2, 'contd': 1,
              'F': -1, 'Fr': -1, 'Abs': -1, 'NP': -1
            };
            
            attempts.sort((a, b) => (gradeValue[b.grade] || -99) - (gradeValue[a.grade] || -99));
            const bestAttempt = attempts[0];
            const attemptCount = attempts.length; // Count how many times

            if (attemptCount > 1) {
              const allGrades = attempts.map(a => a.grade).join(', ');
              addDebugLog(`🔄 ${code} has ${attemptCount} attempts (${allGrades}) → Using best: ${bestAttempt.grade}`, 'info');
            }

            const passing = isPassingGrade(bestAttempt.grade);
            
            // Match the course to get the actual course code from our system
            const match = matchCourse(bestAttempt.name, bestAttempt.code);
            
            if (match) {
              // ALWAYS store attempt count and grade for matched courses (whether passing or not)
              courseAttempts[match.code] = attemptCount;
              courseGrades[match.code] = bestAttempt.grade;
              
              if (!passing) {
                // Course failed - DON'T select it but SHOW the badges
                addBadgesToCourse(match.code, bestAttempt.grade, attemptCount);
                addDebugLog(`⏭️ Skipped ${code} - ${bestAttempt.name} (Grade: ${bestAttempt.grade} - NOT PASSING) - ${attemptCount} attempt(s) tracked`, 'warning');
                continue;
              }
              
              // Course passed - select it (which will also add badges)
              if (!selected.includes(match.code)) {
                select(match.code, bestAttempt.grade, attemptCount); // Pass attempt count
                matched++;
                addDebugLog(`✅ ${bestAttempt.code} → ${match.code} (Grade: ${bestAttempt.grade}, Attempts: ${attemptCount})`, 'success');
              }
            } else {
              notMatched++;
              addDebugLog(`❌ No match: ${bestAttempt.code} - ${bestAttempt.name}`, 'error');
            }
          }

          markNextCourses();
          showSelected();

          addDebugLog(`\n📈 ${matched} matched, ${notMatched} not matched`, 'info');
          
          const uniqueSelected = [...new Set(selected)];
          addDebugLog(`\n📋 SELECTED COURSES (${uniqueSelected.length}):`, 'success');
          uniqueSelected.sort().forEach(code => {
            addDebugLog(`   ✓ ${code}`, 'success');
          });
          
          return { matched, notMatched };
        }

        // Calculate statistics
        // ============ ACADEMIC METRICS CALCULATION ============
        // Calculate proper semester counts distinguishing regular vs summer terms
        function calculateAcademicMetrics(semesters) {
          let firstTermCount = 0;
          let secondTermCount = 0;
          let summerTermCount = 0;
          let lastRegularSemesterIndex = -1;
          
          semesters.forEach((semester, index) => {
            const semName = semester.name || '';
            const isSummer = semester.isSummer || semName.toLowerCase().includes('summer');
            
            if (isSummer) {
              summerTermCount++;
            } else if (semName.includes('First')) {
              firstTermCount++;
              lastRegularSemesterIndex = index;
            } else if (semName.includes('Second')) {
              secondTermCount++;
              lastRegularSemesterIndex = index;
            }
          });
          
          // Regular semesters = first terms + second terms
          const regularSemesters = firstTermCount + secondTermCount;
          
          // Academic years = number of complete year pairs (first + second)
          const completeYears = Math.min(firstTermCount, secondTermCount);
          
          // If there's an unpaired first/second term, add one more year
          const hasUnpairedTerm = firstTermCount !== secondTermCount;
          const totalYears = completeYears + (hasUnpairedTerm ? 1 : 0);
          
          // Count summer terms that come AFTER the last regular semester
          let summerInFinalYear = 0;
          let summerInMiddleYears = 0;
          
          semesters.forEach((semester, index) => {
            const semName = semester.name || '';
            const isSummer = semester.isSummer || semName.toLowerCase().includes('summer');
            
            if (isSummer) {
              if (index > lastRegularSemesterIndex) {
                summerInFinalYear++;
              } else {
                summerInMiddleYears++;
              }
            }
          });
          
          return {
            regularSemesters,      // Total first + second terms
            totalYears,            // Academic years (pairs of semesters)
            summerTerms: summerTermCount,
            summerInFinalYear,     // Summer terms after last regular semester
            summerInMiddleYears,   // Summer terms between regular semesters
            firstTermCount,
            secondTermCount
          };
        }

        function calculateStatistics() {
          // Get unique courses only (in case of duplicates in selected array)
          const uniqueSelected = [...new Set(selected)];
          
          addDebugLog(`\n💯 CALCULATING STATISTICS FOR ${uniqueSelected.length} UNIQUE COURSES:`, 'info');
          
          let totalCredits = 0;
          let completedCount = 0; // Only count courses that exist in the current program
          let skippedCourses = []; // Track courses not found
          
          // Special course tracking
          let specialCourses = {
            TR: false,
            BMA001: false,
            PC401: false,
            PC402: false
          };
          
          let courseBreakdown = [];
          
          uniqueSelected.forEach(code => {
            // ===== CRITICAL VALIDATION: Check if course exists in current program =====
            if (!courses[code]) {
              skippedCourses.push(code);
              addDebugLog(`⚠️ WARNING: Course ${code} not found in current program - SKIPPED`, 'error');
              return; // Skip this course
            }
            
            completedCount++; // Only count if course exists
            const hours = courses[code].hours;
            const name = courses[code].name;
            
            // BMA001 has 0 hours, don't count in 135 total
            if (code === 'BMA001') {
              courseBreakdown.push(`   ${code}: ${name} - ${hours}h (NOT counted in 135h total)`);
            } else {
              totalCredits += hours;
              courseBreakdown.push(`   ${code}: ${name} - ${hours}h ✓`);
            }
            
            // Track special courses
            if (specialCourses.hasOwnProperty(code)) {
              specialCourses[code] = true;
            }
          });
          
          // Log skipped courses summary
          if (skippedCourses.length > 0) {
            addDebugLog(`\n⚠️ SKIPPED ${skippedCourses.length} COURSES NOT IN CURRENT PROGRAM:`, 'error');
            addDebugLog(`   ${skippedCourses.join(', ')}`, 'error');
            addDebugLog(`   💡 Tip: Make sure you selected the correct program (IT vs AI) at the top`, 'warning');
          }
          
          // Log detailed breakdown
          addDebugLog(`\n📊 CREDIT HOURS BREAKDOWN (${completedCount} courses):`, 'info');
          courseBreakdown.forEach(line => addDebugLog(line, 'info'));
          addDebugLog(`\n   TOTAL: ${totalCredits} credit hours`, 'success');

          const percentage = Math.min(Math.round((totalCredits / 135) * 100), 100); // Cap at 100%
          
          // Update UI
          document.getElementById('creditHours').textContent = `${totalCredits}/135`;
          document.getElementById('creditProgress').style.width = `${percentage}%`;
          document.getElementById('creditPercentage').textContent = `${percentage}% Complete`;
          document.getElementById('completedCount').textContent = completedCount;
          
          const totalCourses = Object.keys(courses).length;
          const remaining = totalCourses - completedCount;
          document.getElementById('remainingCount').textContent = `${remaining} Remaining`;

          // Log special course status
          addDebugLog(`\n📋 Special Requirements:`, 'info');
          addDebugLog(`   Summer Training (TR): ${specialCourses.TR ? '✅ Completed' : '❌ Not completed'}`, specialCourses.TR ? 'success' : 'warning');
          addDebugLog(`   Mathematics-0 (BMA001): ${specialCourses.BMA001 ? '✅ Completed' : '❌ Not completed'} (0h - not counted)`, specialCourses.BMA001 ? 'success' : 'warning');
          addDebugLog(`   Project 1 (PC401): ${specialCourses.PC401 ? '✅ Completed' : '❌ Not completed'}`, specialCourses.PC401 ? 'success' : 'warning');
          addDebugLog(`   Project 2 (PC402): ${specialCourses.PC402 ? '✅ Completed' : '❌ Not completed'}`, specialCourses.PC402 ? 'success' : 'warning');
          
          addDebugLog(`\n💯 FINAL TOTAL: ${totalCredits}/135 credit hours (${percentage}%)`, totalCredits >= 135 ? 'success' : 'info');

          return { totalCredits, completedCount, percentage };
        }

        // Show remaining courses
        function showRemainingCourses() {
          const courseListEl = document.getElementById('courseList');
          courseListEl.innerHTML = '';

          // Get unique selected courses
          const uniqueSelected = [...new Set(selected)];
          const remaining = [];
          
          for (const [code, course] of Object.entries(courses)) {
            if (!uniqueSelected.includes(code)) {
              const prereqsMet = course.prerequisites.every(prereq => uniqueSelected.includes(prereq));
              // Get attempt count from courseAttempts if it exists
              const attempts = courseAttempts[code] || 0;
              remaining.push({ code, course, prereqsMet, attempts });
            }
          }

          remaining.sort((a, b) => {
            if (a.prereqsMet !== b.prereqsMet) return b.prereqsMet ? 1 : -1;
            return a.course.semester - b.course.semester;
          });

          remaining.forEach(({ code, course, prereqsMet, attempts }) => {
            const item = document.createElement('div');
            item.className = `course-item ${prereqsMet ? 'available' : 'locked'}`;
            // Make draggable for study plan
            item.draggable = true;
            item.dataset.courseCode = code;
            item.addEventListener('dragstart', function(e) {
              draggedElement = e.target;
              draggedCourseCode = code;
              draggedFromSemester = -1;
              e.dataTransfer.effectAllowed = 'move';
              e.dataTransfer.setData('text/plain', code);
              e.target.style.opacity = '0.6';
            });
            item.addEventListener('dragend', function(e) {
              e.target.style.opacity = '';
              draggedCourseCode = null;
              draggedFromSemester = null;
              draggedElement = null;
            });
            
            // Build the course info HTML
            let attemptBadge = '';
            if (attempts > 0) {
              attemptBadge = `<span class="course-attempts-badge" style="background-color: #dc2626; color: white; padding: 2px 8px; border-radius: 12px; font-size: 11px; margin-left: 8px; font-weight: bold;">×${attempts} attempt${attempts > 1 ? 's' : ''}</span>`;
            }
            
            item.innerHTML = `
              <div>
                <span class="course-item-name">${course.name}</span>
                <span class="course-item-code">(${code})</span>
                ${attemptBadge}
              </div>
              <span class="course-item-hours">${course.hours}h</span>
            `;
            courseListEl.appendChild(item);
          });
        }

        // ============ STUDY PLAN GENERATOR ============
        
        let generatedPlans = [];
        let currentPlanIndex = 0;

        // ============ ACADEMIC RULE ENGINE ============

        // Convert course's semester number (1-8) to semester type (1 or 2)
        // Semester 1,3,5,7 → Type 1 (can be taken in student terms 1,3,5,7)
        // Semester 2,4,6,8 → Type 2 (can be taken in student terms 2,4,6,8)
        function getSemesterType(courseSemester) {
          return (courseSemester % 2 === 1) ? 1 : 2;
        }

        // Detect student's current term from transcript
        // MODIFIED LOGIC:
        // 1. Find last registered semester (highest semester with registered courses)
        // 2. Check if that semester has grades:
        //    - If YES → start plan from NEXT semester
        //    - If NO → ignore that registration, start from previous completed semester + 1
        function detectCurrentTerm(pdfCourses) {
          let currentTerm = {
            termNumber: null,
            registeredCourses: [],
            isDetected: false,
            hasGrades: false
          };
          
          // Separate courses into completed and registered
          // c.grade holds التقدير (letter grade like D, F, Fr, etc.)
          // It is NEVER '0' — '0' is النقاط (points), not التقدير
          const coursesWithGrades = pdfCourses.filter(c => 
            c.grade && c.grade.trim() !== ''
          );
          
          const coursesWithoutGrades = pdfCourses.filter(c => 
            !c.grade || c.grade.trim() === ''
          );
          
          // Deduplication guard: pattern3 (no-grade pattern) can produce false positives
          // for courses like IT438 (grade=F, points=0) because "F 0 100 3 name IT438"
          // contains "0 100 3 name IT438" which pattern3 also matches.
          // Solution: discard any "no-grade" entry whose code also appears WITH a grade.
          const codesWithGrades = new Set(
            coursesWithGrades.map(c => c.code.replace(/\s+/g, ''))
          );
          const trulyUngraded = coursesWithoutGrades.filter(c => {
            const norm = c.code.replace(/\s+/g, '');
            return !codesWithGrades.has(norm);
          });
          
          // Find the highest semester number from registered courses (without grades)
          let lastRegisteredSemester = 0;
          const lastRegisteredCourses = [];
          
          if (trulyUngraded.length > 0) {
            addDebugLog(`📋 Found ${trulyUngraded.length} registered courses (no grades):`, 'info');
            
            trulyUngraded.forEach(pdfCourse => {
              const match = matchCourse(pdfCourse.name, pdfCourse.code);
              if (match && courses[match.code]) {
                // BMA001 (Mathematics-0) has no real semester, exclude it from comparisons
                if (match.code === 'BMA001') return;
                
                const semesterNum = courses[match.code].semester;
                addDebugLog(`   📌 ${match.code} (Sem ${semesterNum}) - ${pdfCourse.name}`, 'info');
                
                if (semesterNum > lastRegisteredSemester) {
                  lastRegisteredSemester = semesterNum;
                  lastRegisteredCourses.length = 0;
                  lastRegisteredCourses.push(pdfCourse);
                } else if (semesterNum === lastRegisteredSemester) {
                  lastRegisteredCourses.push(pdfCourse);
                }
              }
            });
            
            if (lastRegisteredSemester > 0) {
              addDebugLog(`\n🔍 Last Registered Semester: ${lastRegisteredSemester}`, 'warning');
              addDebugLog(`   Courses in this semester: ${lastRegisteredCourses.length}`, 'info');
              
              // Check if ANY course in this semester has a grade
              let semesterHasGrades = false;
              lastRegisteredCourses.forEach(c => {
                if (c.grade && c.grade.trim() !== '') {
                  semesterHasGrades = true;
                }
              });
              
              if (semesterHasGrades) {
                // Last registered semester HAS grades → start from NEXT semester
                addDebugLog(`   ✅ Last registered semester HAS grades`, 'success');
                addDebugLog(`   → Plan will start from Semester ${lastRegisteredSemester + 1}`, 'success');
                
                currentTerm.termNumber = lastRegisteredSemester + 1;
                currentTerm.hasGrades = true;
              } else {
                // Last registered semester has NO grades → Plan should start FROM this semester
                // Treat these registered courses as remaining courses (not completed)
                addDebugLog(`   ⚠️ Last registered semester has NO grades - TREATING AS CURRENT SEMESTER`, 'warning');
                addDebugLog(`   → Registered courses will be treated as REMAINING (not completed)`, 'info');
                addDebugLog(`   → Plan will start FROM Semester ${lastRegisteredSemester} (CURRENT SEMESTER)`, 'success');
                
                // Set the plan to start FROM the current registered semester
                // This way, the registered courses (which weren't marked as completed) 
                // will be included in the study plan
                currentTerm.termNumber = lastRegisteredSemester;
                currentTerm.hasGrades = false;
              }
              
              currentTerm.registeredCourses = lastRegisteredCourses;
              currentTerm.isDetected = true;
            }
          } else {
            // No courses without grades - student has completed all courses in transcript
            // Need to determine what semester they just finished
            
            // Get all courses with grades
            const completedCourses = pdfCourses.filter(c => 
              c.grade && c.grade.trim() !== ''
            );
            
            // Match them to our course database and find their semester types
            const semesterNumbers = [];
            
            completedCourses.forEach(pdfCourse => {
              const match = matchCourse(pdfCourse.name, pdfCourse.code);
              if (match && courses[match.code]) {
                // BMA001 (Mathematics-0) has no real semester, exclude it
                if (match.code === 'BMA001') return;
                semesterNumbers.push(courses[match.code].semester);
              }
            });
            
            if (semesterNumbers.length > 0) {
              // Find the most recent semester completed
              const maxSemester = Math.max(...semesterNumbers);
              
              // Determine what the NEXT term should be
              // If they finished semester 1 → next is semester 2 (term 2)
              // If they finished semester 2 → next is semester 3 (term 3)
              // etc.
              const nextSemester = maxSemester + 1;
              
              // Convert next semester to term number
              // Semester 1 → Term 1, Semester 2 → Term 2, etc.
              currentTerm.termNumber = nextSemester;
              
              if (currentTerm.termNumber > 8) {
                currentTerm.termNumber = 8; // Cap at term 8
              }
              
              currentTerm.isDetected = true;
              
              const passedCourses = pdfCourses.filter(c => 
                c.grade && isPassingGrade(c.grade)
              ).length;
              
              addDebugLog(`🎯 Last completed semester: ${maxSemester}, Next term: ${currentTerm.termNumber} (${passedCourses} passed courses)`, 'success');
            } else {
              // Fallback: estimate based on passed courses count
              const passedCourses = pdfCourses.filter(c => 
                c.grade && c.grade.trim() !== '' && isPassingGrade(c.grade)
              ).length;
              
              let estimatedYear = Math.ceil(passedCourses / 14);
              if (estimatedYear < 1) estimatedYear = 1;
              if (estimatedYear > 4) estimatedYear = 4;
              
              // Start from next term
              const baseTermForYear = (estimatedYear - 1) * 2;
              currentTerm.termNumber = baseTermForYear + 1; // Start from odd term of current year
              currentTerm.isDetected = true;
              
              addDebugLog(`🎯 No current registration, estimated next term: ${currentTerm.termNumber} (${passedCourses} passed courses)`, 'info');
            }
          }
          
          return currentTerm;
        }

        // Validate current term registration
        function validateCurrentRegistration(currentTerm, completedCourses) {
          const violations = [];
          
          if (!currentTerm.isDetected) return { isValid: true, violations: [] };
          
          const termType = (currentTerm.termNumber % 2 === 1) ? 1 : 2;
          
          currentTerm.registeredCourses.forEach(pdfCourse => {
            const match = matchCourse(pdfCourse.name, pdfCourse.code);
            if (!match) return;
            
            const course = courses[match.code];
            if (!course) return;
            
            // Check 1: Semester type matching
            const courseSemesterType = getSemesterType(course.semester);
            if (courseSemesterType !== termType) {
              violations.push({
                code: match.code,
                reason: `Wrong term type - ${match.code} is semester ${courseSemesterType} course, but registered in term ${currentTerm.termNumber} (type ${termType})`
              });
            }
            
            // Check 2: Prerequisites
            const unmetPrereqs = course.prerequisites.filter(prereq => !completedCourses.includes(prereq));
            if (unmetPrereqs.length > 0) {
              violations.push({
                code: match.code,
                reason: `Missing prerequisites: ${unmetPrereqs.join(', ')}`
              });
            }
          });
          
          return {
            isValid: violations.length === 0,
            violations: violations
          };
        }

        // Get available courses (prerequisites met)
        function getAvailableCourses(completedCourses, remainingCourses) {
          // Calculate current credit hours
          const currentHours = completedCourses.reduce((sum, code) => {
            // Don't count BMA001 (Math-0) toward credit hours
            if (code === 'BMA001') return sum;
            return sum + (courses[code]?.hours || 0);
          }, 0);

          return remainingCourses.filter(code => {
            const course = courses[code];
            
            // Check regular prerequisites
            const prereqsMet = course.prerequisites.every(prereq => completedCourses.includes(prereq));
            if (!prereqsMet) return false;
            
            // Special rule: TR (Summer Training) requires 60+ credit hours
            if (code === 'TR' && currentHours < 60) {
              return false;
            }
            
            // Special rule: PC401 (Project 1) requires 85+ credit hours
            if (code === 'PC401' && currentHours < 85) {
              return false;
            }
            
            return true;
          });
        }

        // Generate a study plan
        function generateStudyPlan(strategy = 'balanced', startTerm = 3) {
          const uniqueSelected = [...new Set(selected)];
          const remaining = Object.keys(courses).filter(code => {
            // Exclude completed courses and special courses
            if (uniqueSelected.includes(code)) return false;
            if (code === 'BMA001') return false; // Math-0 doesn't count
            return true;
          });

          const plan = [];
          let completed = [...uniqueSelected];
          let toSchedule = [...remaining];
          
          // Calculate current credit hours
          const calculateHours = (courseList) => {
            return courseList.reduce((sum, code) => {
              if (code === 'BMA001') return sum;
              return sum + (courses[code]?.hours || 0);
            }, 0);
          };
          
          let currentHours = calculateHours(completed);
          
          // Start from detected or provided term
          let currentTermNumber = startTerm;
          let semesterCount = 0;
          const maxSemesters = 12; // Safety limit

          // ==========================================
          // CALCULATE BASE YEAR FROM CURRENT DATE
          // ==========================================
          const now = new Date();
          const currentCalendarYear = now.getFullYear(); // e.g., 2026
          const currentMonth = now.getMonth() + 1; // e.g., 2 for February
          
          // Current academic year (Sep-Aug cycle)
          // If month >= 9 (Sep-Dec), use current year as base
          // If month < 9 (Jan-Aug), use previous year as base
          const currentAcademicYear = (currentMonth >= 9) ? currentCalendarYear : currentCalendarYear - 1;
          
          // Calculate which "year of study" the startTerm is in (0-indexed)
          // Terms 1-2 = year 0, Terms 3-4 = year 1, Terms 5-6 = year 2, etc.
          const startTermYearIndex = Math.floor((startTerm - 1) / 2);
          
          // Calculate base year for terms 1-2 (year 0)
          // If we're starting at term 6 (year index 2) in Feb 2026 (academic year 2025-2026)
          // then term 1-2 would have been in 2023-2024
          const term1BaseYear = currentAcademicYear - startTermYearIndex;
          
          addDebugLog(`\n📅 DATE-BASED YEAR CALCULATION:`, 'info');
          addDebugLog(`   Current date: ${now.toLocaleDateString()}`, 'info');
          addDebugLog(`   Current academic year: ${currentAcademicYear}-${currentAcademicYear + 1}`, 'info');
          addDebugLog(`   Starting from term ${startTerm} (year index ${startTermYearIndex})`, 'info');
          addDebugLog(`   Calculated base year for terms 1-2: ${term1BaseYear}-${term1BaseYear + 1}`, 'info');

          addDebugLog(`\n🎯 Planning starts from Term ${currentTermNumber} (${toSchedule.length} courses remaining, ${currentHours}h completed)`, 'info');
          
          // Log what courses need to be scheduled
          const failedCourses = toSchedule.filter(code => {
            return completed.includes(code) === false && 
                   Object.keys(courses).includes(code);
          });
          
          addDebugLog(`📝 Courses to schedule: ${toSchedule.join(', ')}`, 'info');

          while (toSchedule.length > 0 && semesterCount < maxSemesters) {
            // Determine term type (1 = odd/First, 2 = even/Second)
            const termType = (currentTermNumber % 2 === 1) ? 1 : 2;
            
            addDebugLog(`\n--- Planning Term ${currentTermNumber} (Type ${termType}) ---`, 'info');
            
            // Calculate remaining hours
            const remainingHours = calculateHours(toSchedule);
            addDebugLog(`   Remaining to schedule: ${toSchedule.length} courses, ${remainingHours} hours`, 'info');
            
            // Determine semester limits
            let maxHours = 18; // Default max
            let minHours = 9;
            
            // FILTER: Get courses available for this term
            let available = toSchedule.filter(code => {
              const course = courses[code];
              if (!course) {
                addDebugLog(`   ❌ ${code}: Course not found in database`, 'error');
                return false;
              }
              
              // Rule 1: Semester type must match term type
              const courseSemesterType = getSemesterType(course.semester);
              if (courseSemesterType !== termType) {
                addDebugLog(`   ⏭️ ${code} (Sem ${course.semester}): Wrong type (need type ${termType}, has type ${courseSemesterType})`, 'info');
                return false;
              }
              
              // Rule 2: Prerequisites must be met
              const prereqsMet = course.prerequisites.every(prereq => completed.includes(prereq));
              if (!prereqsMet) {
                const missing = course.prerequisites.filter(p => !completed.includes(p));
                addDebugLog(`   ⏭️ ${code}: Missing prerequisites: ${missing.join(', ')}`, 'info');
                return false;
              }
              
              // Rule 3: TR requires 60+ hours (but TR can only be in summer, so skip in normal terms)
              if (code === 'TR') {
                addDebugLog(`   ⏭️ TR: Can only be taken in summer`, 'info');
                return false;
              }
              
              // Rule 4: PC401 requires 85+ hours
              if (code === 'PC401' && currentHours < 85) {
                addDebugLog(`   ⏭️ PC401: Not enough hours (${currentHours}/85)`, 'info');
                return false;
              }
              
              addDebugLog(`   ✅ ${code} (Sem ${course.semester}): Available`, 'success');
              return true;
            });
            
            addDebugLog(`   → ${available.length} courses available for this term`, 'info');
            
            // PRIORITIZE: Smart dependency management + fill to max
            available = available.map(code => {
              const unlocks = Object.keys(courses).filter(c => 
                courses[c].prerequisites.includes(code) && toSchedule.includes(c)
              ).length;
              
              // SPECIAL PRIORITY: Projects get highest priority when eligible
              let priority = unlocks;
              if (code === 'PC401' && currentHours >= 85) {
                priority = 1000;
              } else if (code === 'PC402' && completed.includes('PC401')) {
                priority = 999;
              }
              
              return { code, unlocks, priority, hours: courses[code].hours };
            });
            
            // Sort by priority first, then by hours (to fill to max)
            available.sort((a, b) => {
              if (b.priority !== a.priority) return b.priority - a.priority;
              return b.hours - a.hours;
            });
            
            const availableCodes = available.map(item => item.code);
            if (availableCodes.includes('PC401')) {
              addDebugLog(`   🎯 PC401 prioritized (current hours: ${currentHours})`, 'success');
            }
            if (availableCodes.includes('PC402')) {
              addDebugLog(`   🎯 PC402 prioritized`, 'success');
            }
            
            available = available.map(item => item.code);
            
            // SELECT: Fill semester to max hours (18 or special limits)
            const termCourses = [];
            let termHours = 0;
            
            for (const code of available) {
              const courseHours = courses[code].hours;
              if (termHours + courseHours <= maxHours) {
                termCourses.push(code);
                termHours += courseHours;
              }
            }
            
            // If no courses can be added, break
            if (termCourses.length === 0) {
              addDebugLog(`   ⚠️ No courses available to schedule`, 'warning');
              break;
            }
            
            // Add term to plan
            // Calculate year based on the term number and base year
            const termYearIndex = Math.floor((currentTermNumber - 1) / 2);
            const year = term1BaseYear + termYearIndex;
            const termName = termType === 1 ? 'First' : 'Second';
            
            plan.push({
              name: `${termName} Term ${year}-${year + 1}`,
              courses: termCourses,
              hours: termHours,
              isSummer: false,
              isSpecialCase: false
            });
            
            // Mark courses as completed
            completed.push(...termCourses);
            toSchedule = toSchedule.filter(code => !termCourses.includes(code));
            currentHours = calculateHours(completed);
            
            addDebugLog(`   ✅ Added ${termCourses.length} courses (${termHours}h). Total hours: ${currentHours}`, 'success');
            
            // ==========================================
            // POST-SEMESTER CHECKS (IN SEQUENCE)
            // ==========================================
            
            // CHECK 1: TR SUMMER (after even semesters with 60+ hours)
            if (termType === 2 && toSchedule.includes('TR') && currentHours >= 60) {
              addDebugLog(`\n   🌞 CHECK 1: TR CONDITION MET`, 'success');
              addDebugLog(`      → Current semester is EVEN (Second Term)`, 'info');
              addDebugLog(`      → Gained hours: ${currentHours} >= 60`, 'info');
              addDebugLog(`      → TR not added yet`, 'info');
              addDebugLog(`      → AUTO-ADDING TR Summer`, 'success');
              
              const trPrereqsMet = courses['TR'].prerequisites.every(prereq => completed.includes(prereq));
              if (trPrereqsMet) {
                plan.push({
                  name: `Summer Term ${year}-${year + 1}`,
                  courses: ['TR'],
                  hours: 2,
                  isSummer: true,
                  isSpecialCase: false
                });
                
                completed.push('TR');
                toSchedule = toSchedule.filter(code => code !== 'TR');
                currentHours = calculateHours(completed);
                
                addDebugLog(`      ✅ Added TR summer. Total hours: ${currentHours}`, 'success');
              }
            }
            
            // Recalculate remaining after potential TR addition
            const newRemainingHours = calculateHours(toSchedule);
            
            // CHECK 3: SPECIAL SUMMER (after even, ≤12 hours remaining - REGARDLESS of type mix)
            // This check must come BEFORE CHECK 2 because it's more specific
            if (termType === 2 && newRemainingHours > 0 && newRemainingHours <= 12 && toSchedule.length > 0) {
              // After even semester with ≤12h remaining, always use summer special case
              addDebugLog(`\n   ⭐ CHECK 3: SPECIAL SUMMER CASE`, 'success');
              addDebugLog(`      → Current semester is EVEN (Second Term)`, 'info');
              addDebugLog(`      → Next would be ODD (First Term)`, 'info');
              addDebugLog(`      → Remaining hours: ${newRemainingHours} (0 < hours <= 12)`, 'info');
              addDebugLog(`      → Adding special summer with NO semester restrictions`, 'success');
              
              // Filter courses (can take ANY semester type, except PC401/PC402)
              const summerCourses = toSchedule.filter(code => {
                const course = courses[code];
                if (!course) return false;
                
                // Check prerequisites
                const prereqsMet = course.prerequisites.every(prereq => completed.includes(prereq));
                if (!prereqsMet) return false;
                
                // TR special requirement
                if (code === 'TR' && currentHours < 60) return false;
                
                // PC401 and PC402 CANNOT be in summer
                if (code === 'PC401' || code === 'PC402') {
                  addDebugLog(`      ⏭️ ${code}: Cannot be taken in summer (projects restricted)`, 'warning');
                  return false;
                }
                
                return true;
              });
                
              if (summerCourses.length > 0) {
                let summerHours = 0;
                const selectedSummer = [];
                
                // Prioritize and fill to max 12 hours
                const prioritizedSummer = summerCourses.map(code => {
                  const unlocks = Object.keys(courses).filter(c => 
                    courses[c].prerequisites.includes(code) && toSchedule.includes(c)
                  ).length;
                  return { code, unlocks, hours: courses[code].hours };
                }).sort((a, b) => {
                  if (b.unlocks !== a.unlocks) return b.unlocks - a.unlocks;
                  return b.hours - a.hours;
                });
                
                for (const item of prioritizedSummer) {
                  const hours = item.hours;
                  if (summerHours + hours <= 12) {
                    selectedSummer.push(item.code);
                    summerHours += hours;
                  }
                }
                
                if (selectedSummer.length > 0) {
                  plan.push({
                    name: `Summer Term Special Case`,
                    courses: selectedSummer,
                    hours: summerHours,
                    isSummer: true,
                    isSpecialCase: true
                  });
                  
                  completed.push(...selectedSummer);
                  toSchedule = toSchedule.filter(code => !selectedSummer.includes(code));
                  currentHours = calculateHours(completed);
                  
                  addDebugLog(`      ✅ Added special summer: ${selectedSummer.length} courses, ${summerHours}h`, 'success');
                  addDebugLog(`      → Courses: ${selectedSummer.join(', ')}`, 'info');
                }
              }
            }
            
            // Recalculate remaining again after potential summer addition
            const finalRemainingHours = calculateHours(toSchedule);
            
            // CHECK 2: SPECIAL CASE 21-HOUR SEMESTER (same semester type, 0-21 hours)
            // This check comes AFTER CHECK 3 (more general fallback)
            if (finalRemainingHours > 0 && finalRemainingHours <= 21 && toSchedule.length > 0) {
              // Check if all remaining courses are from same semester type
              const remainingSemesterTypes = toSchedule.map(code => {
                const course = courses[code];
                return course ? getSemesterType(course.semester) : null;
              }).filter(t => t !== null);
              
              const allType1 = remainingSemesterTypes.every(t => t === 1);
              const allType2 = remainingSemesterTypes.every(t => t === 2);
              
              if (allType1 || allType2) {
                const sameSemesterType = allType1 ? 1 : 2;
                addDebugLog(`\n   ⭐ CHECK 2: SPECIAL CASE 21-HOUR SEMESTER`, 'success');
                addDebugLog(`      → Remaining hours: ${finalRemainingHours} (0 < hours <= 21)`, 'info');
                addDebugLog(`      → All courses are from ${allType1 ? 'ODD (First)' : 'EVEN (Second)'} semesters`, 'info');
                addDebugLog(`      → Adding all as special 21-hour semester`, 'success');
                
                // Filter courses that meet prerequisites
                const finalCourses = toSchedule.filter(code => {
                  const course = courses[code];
                  if (!course) return false;
                  if (code === 'TR') return false; // TR only in summer
                  
                  const prereqsMet = course.prerequisites.every(prereq => completed.includes(prereq));
                  if (!prereqsMet) return false;
                  
                  if (code === 'PC401' && currentHours < 85) return false;
                  
                  return true;
                });
                
                if (finalCourses.length > 0) {
                  const finalHours = calculateHours(finalCourses);
                  const nextTermNumber = currentTermNumber + 1;
                  const nextTermType = (nextTermNumber % 2 === 1) ? 1 : 2;
                  const nextTermYearIndex = Math.floor((nextTermNumber - 1) / 2);
                  const nextYear = term1BaseYear + nextTermYearIndex;
                  const nextTermName = nextTermType === 1 ? 'First' : 'Second';
                  
                  plan.push({
                    name: `${nextTermName} Term ${nextYear}-${nextYear + 1}`,
                    courses: finalCourses,
                    hours: finalHours,
                    isSummer: false,
                    isSpecialCase: true
                  });
                  
                  completed.push(...finalCourses);
                  toSchedule = toSchedule.filter(code => !finalCourses.includes(code));
                  currentHours = calculateHours(completed);
                  
                  addDebugLog(`      ✅ Added special 21-hour semester: ${finalCourses.length} courses, ${finalHours}h`, 'success');
                }
              }
            }
            
            // Move to next term
            currentTermNumber++;
            if (currentTermNumber > 12) {
              addDebugLog(`⚠️ Reached maximum term (12), stopping`, 'warning');
              break;
            }
            
            semesterCount++;
          }
          
          // Add warning if not all courses could be scheduled
          if (toSchedule.length > 0) {
            addDebugLog(`\n⚠️ Warning: ${toSchedule.length} courses could not be scheduled:`, 'warning');
            toSchedule.forEach(code => {
              addDebugLog(`   - ${code}: ${courses[code]?.name}`, 'warning');
            });
          }
          
          return plan;
        }

        // Display study plan with drag-and-drop
        // ============================================================
        // AUTO-CONVERT LAST ODD SEMESTER → SUMMER SPECIAL CASE
        // Trigger: last plan semester is a First (odd) semester AND
        // its credit hours are ≤ 12 (user dragged enough courses out).
        // Note: If lab courses remain the user will see a warning but
        // the conversion still happens — they can drag labs out manually.
        // ============================================================
        function checkAndConvertLastOddSemester(plan) {
          if (!plan || plan.semesters.length === 0) return false;

          const lastIdx = plan.semesters.length - 1;
          const lastSem  = plan.semesters[lastIdx];

          // Must be a non-summer First Term (odd) semester
          const isFirstTerm = !lastSem.isSummer &&
            (lastSem.name.includes('First') || lastSem.name.includes('Odd'));

          if (!isFirstTerm) return false;
          // FIXED: Only convert to special case if hours are between 1-12 (light semester that can become summer)
          // NOT if hours are > 18 (that would be regular semester overflow)
          if (lastSem.hours <= 0 || lastSem.hours > 12) return false;

          // ══ CRITICAL FIX: Only convert if this is truly an "odd" unpaired semester ══
          // Check if the previous semester is a Second Term or Summer
          // If previous is a First Term, then this is a paired Second-to-First sequence (normal)
          if (lastIdx > 0) {
            const prevSem = plan.semesters[lastIdx - 1];
            const prevIsFirst = !prevSem.isSummer && prevSem.name.includes('First');
            
            // If previous semester is ALSO a First Term, this current First Term is paired
            // and should NOT be converted to Summer Special Case
            if (prevIsFirst) {
              return false; // Don't convert paired First Terms
            }
          }

          // ── Detect projects that can't be taken in summer ──────
          const projectCourses = lastSem.courses.filter(code => {
            return isProjectCourse(code);
          });

          // ── Convert ──────────────────────────────────────────────
          const yearMatch = lastSem.name.match(/(\d{4})/);
          const baseYear  = yearMatch ? parseInt(yearMatch[1]) : new Date().getFullYear();

          // Only convert once (avoid re-converting already-converted)
          if (lastSem.isSummer) return false;

          lastSem.isSummer      = true;
          // FIXED: Only set special case if hours > 9 (exceeds normal summer limit)
          lastSem.isSpecialCase = (lastSem.hours > 9);
          const specialCaseLabel = lastSem.isSpecialCase ? ' ⭐ Special Case' : '';
          lastSem.name          = `Summer Term ${baseYear}-${baseYear + 1}${specialCaseLabel}`;

          if (projectCourses.length > 0) {
            const projectNames = projectCourses.map(c => courses[c]?.name || c).join(', ');
            TechBot.warning(
              `⭐ Last semester converted to Summer${lastSem.isSpecialCase ? ' Special Case' : ''} (${lastSem.hours}h). ` +
              `⚠️ Note: Project courses cannot be taken in summer — please drag out: ${projectNames}`
            );
          } else {
            const scMsg = lastSem.isSpecialCase 
              ? ` ⭐ Special Case (>9h) — max 12 hours.`
              : ` (≤9h) — max 9 hours.`;
            TechBot.success(
              `Last semester converted to Summer!${scMsg}`
            );
          }
          return true;
        }

        // ============================================================
        // GRADUATION SHORTCUT — MULTI-OPTION ENGINE
        // Finds every viable way to shed excess hours from the last
        // First Term into the preceding Second Term so the last
        // semester drops to ≤ 12 h and converts to a Summer.
        // ============================================================

        // Stored options (array) for the currently displayed plan
        let _shortcutOptions = [];

        // ── Helper: generate all combinations of `size` from `arr` ──
        function getCombinations(arr, size) {
          if (size === 1) return arr.map(x => [x]);
          const result = [];
          for (let i = 0; i <= arr.length - size; i++) {
            getCombinations(arr.slice(i + 1), size - 1).forEach(rest =>
              result.push([arr[i], ...rest])
            );
          }
          return result;
        }

        // ── Compute all valid shortcut options for the current plan ──
        // Returns [] when no shortcut is possible.
        function computeShortcutOptions() {
          const plan = generatedPlans[currentPlanIndex];
          if (!plan || plan.semesters.length < 2) return [];

          const lastIdx = plan.semesters.length - 1;
          const prevIdx = plan.semesters.length - 2;
          const lastSem = plan.semesters[lastIdx];
          const prevSem = plan.semesters[prevIdx];

          // Guards
          if (lastSem.isSummer)                    return [];
          if (!lastSem.name.includes('First'))      return [];
          const SUMMER_MAX  = 12;
          if (lastSem.hours <= SUMMER_MAX)          return []; // already auto-converts
          if (prevSem.isSummer)                     return [];
          if (!prevSem.name.includes('Second'))     return [];

          const PREV_MAX       = prevSem.isSpecialCase ? 21 : 18;
          const prevAvailable  = PREV_MAX - prevSem.hours;
          if (prevAvailable <= 0)                   return [];

          const excessHours = lastSem.hours - SUMMER_MAX;
          if (excessHours > prevAvailable)          return [];

          // Build "completed before prevSem" set for prereq checking
          const completedBeforePrev = new Set(selected);
          for (let i = 0; i < prevIdx; i++)
            plan.semesters[i].courses.forEach(c => completedBeforePrev.add(c));

          // Courses from last semester eligible to move
          const moveable = lastSem.courses.filter(code => {
            if (code === 'PC401' || code === 'PC402') return false;
            const c = courses[code];
            return c && c.prerequisites.every(p => completedBeforePrev.has(p));
          });

          if (moveable.length === 0) return [];

          const seen    = new Set();
          const options = [];

          // Try subsets of size 1, 2, 3 (keeps complexity low)
          for (let size = 1; size <= Math.min(3, moveable.length); size++) {
            for (const combo of getCombinations(moveable, size)) {
              const moveHours = combo.reduce((s, c) => s + (courses[c]?.hours || 0), 0);

              // Must shed enough AND fit in prevSem
              if (moveHours < excessHours) continue;
              if (moveHours > prevAvailable) continue;

              const key = [...combo].sort().join(',');
              if (seen.has(key)) continue;
              seen.add(key);

              options.push({
                toMove:       combo,
                moveHours,
                newPrevHours: prevSem.hours   + moveHours,
                newLastHours: lastSem.hours   - moveHours,
                prevSemName:  prevSem.name,
                lastSemName:  lastSem.name,
              });
            }
            if (options.length >= 8) break; // cap at 8 total
          }

          // Annotate each option with semester counts
          const currentCount = plan.semesters.length;
          options.forEach(opt => {
            // The shortcut keeps the same number of semesters but converts the
            // last First Term into a Summer — effectively saving the student
            // one full-semester workload.  We show it as N → (N-1) regular + Summer.
            opt.currentSemCount = currentCount;
            opt.resultSemCount  = currentCount - 1; // last → Summer (not a "full" term)
          });

          // Sort: fewest courses to move first, then smallest hour shift
          options.sort((a, b) =>
            a.toMove.length !== b.toMove.length
              ? a.toMove.length - b.toMove.length
              : a.moveHours    - b.moveHours
          );

          return options.slice(0, 8);
        }

        // ── Refresh the shortcut button visibility after any plan change ──
        function refreshShortcutButton() {
          _shortcutOptions = computeShortcutOptions();
          const btn = document.getElementById('shortcutBtn');
          if (!btn) return;
          if (_shortcutOptions.length > 0) {
            btn.classList.add('visible');
          } else {
            btn.classList.remove('visible');
          }
        }

        // ── Open the multi-option modal ──
        function openShortcutModal() {
          _shortcutOptions = computeShortcutOptions();
          if (_shortcutOptions.length === 0) {
            TechBot.notify('No graduation shortcut available for the current plan.');
            return;
          }

          const plan    = generatedPlans[currentPlanIndex];
          const lastSem = plan.semesters[plan.semesters.length - 1];
          const yearMatch = lastSem.name.match(/(\d{4})-(\d{4})/);
          const summerLabel = yearMatch
            ? `Summer ${yearMatch[1]}-${yearMatch[2]} ⭐`
            : 'Summer ⭐';

          const currentSemN = plan.semesters.length;
          const scYearM2 = lastSem.name.match(/(\d{4})/);
          const scYear2  = scYearM2 ? parseInt(scYearM2[1]) : (plan.term1BaseYear || 2025);
          document.getElementById('shortcut-modal-subtitle').textContent =
            `Your plan currently has ${currentSemN} semesters, ending with "${lastSem.name}" (${lastSem.hours}h — a full heavy term). ` +
            `Move some courses into the previous semester so the last term drops to ≤12h and converts to ` +
            `"Summer Special Case ${scYear2}-${scYear2+1}" — a lighter finish that ends earlier in the calendar year.`;

          const grid = document.getElementById('shortcut-options-grid');
          grid.innerHTML = '';

          _shortcutOptions.forEach((opt, idx) => {
            const card = document.createElement('div');
            card.className = 'shortcut-option-card';

            // Calculate regular semester counts
            const currentRegularCount = plan.semesters.filter(s => !s.isSummer).length;
            const simulatedRegularCount = currentRegularCount - 1; // Last odd semester becomes summer
            
            // Ribbon header
            const ribbonText = `📅 <span style="text-decoration:line-through;opacity:0.85;">${currentRegularCount} semesters</span> → ${simulatedRegularCount} + ☀️ Summer ⭐ Saves ${currentRegularCount - simulatedRegularCount} semester${(currentRegularCount - simulatedRegularCount) > 1 ? 's' : ''}!`;
            
            const badge = `<div class="shortcut-option-badge">Option ${idx + 1} — Move ${opt.toMove.length} course${opt.toMove.length > 1 ? 's' : ''} (${opt.moveHours}h)</div>`;

            // Course list
            const listItems = opt.toMove.map(code => {
              const c = courses[code];
              return `<li>
                <span class="shortcut-move-code">${code}</span>
                <span style="flex:1;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">${c?.name || code}</span>
                <span class="shortcut-move-hours">${c?.hours || 0}h</span>
              </li>`;
            }).join('');

            // Result preview
            const prevShort  = opt.prevSemName.replace('Term ', '').replace(/\d{4}-\d{4}/, '').trim();
            const lastShort  = opt.lastSemName.replace('Term ', '').replace(/\d{4}-\d{4}/, '').trim();
            const prevPreview = `
              <div class="shortcut-result-row">
                <span class="shortcut-result-label">📅 ${prevShort}</span>
                <span class="shortcut-result-hours">
                  <span class="old">${plan.semesters[plan.semesters.length - 2].hours}h</span>
                  <span class="new">${opt.newPrevHours}h</span>
                </span>
              </div>`;
            const summerPreview = `
              <div class="shortcut-result-row">
                <span class="shortcut-result-label">☀️ ${lastShort} → Summer ⭐</span>
                <span class="shortcut-result-hours">
                  <span class="old">${opt.lastSemName.includes('First') ? plan.semesters[plan.semesters.length - 1].hours + 'h' : ''}</span>
                  <span class="summer-new">${opt.newLastHours}h</span>
                </span>
              </div>`;

            card.innerHTML = `
              <div class="shortcut-card-ribbon">${ribbonText}</div>
              <div class="shortcut-card-body">
                ${badge}
                <ul class="shortcut-move-list">${listItems}</ul>
                <div class="shortcut-result-preview">${prevPreview}${summerPreview}</div>
                <button class="shortcut-apply-btn" onclick="applyShortcutOption(${idx})">
                  ✅ Apply This Option
                </button>
              </div>`;

            grid.appendChild(card);
          });

          document.getElementById('shortcut-modal').classList.add('show');
        }

        // ── Apply the chosen option ──
        function applyShortcutOption(idx) {
          const opt  = _shortcutOptions[idx];
          const plan = generatedPlans[currentPlanIndex];
          if (!opt || !plan) return;

          const lastIdx = plan.semesters.length - 1;
          const prevIdx = plan.semesters.length - 2;
          const lastSem = plan.semesters[lastIdx];
          const prevSem = plan.semesters[prevIdx];

          UndoRedoManager.saveState(
            `Summer shortcut: moved ${opt.toMove.join(', ')} → ${prevSem.name}`
          );

          opt.toMove.forEach(code => {
            const i = lastSem.courses.indexOf(code);
            if (i > -1) {
              lastSem.courses.splice(i, 1);
              lastSem.hours -= courses[code]?.hours || 0;
            }
            prevSem.courses.push(code);
            prevSem.hours += courses[code]?.hours || 0;
          });

          closeShortcutModal();
          // checkAndConvertLastOddSemester inside displayStudyPlan will
          // automatically convert the now-≤12h First Term to Summer.
          displayStudyPlan(currentPlanIndex);
          TechBot.success(`⭐ Graduation shortcut applied! Last semester → Summer Special Case.`);
        }

        function closeShortcutModal() {
          document.getElementById('shortcut-modal').classList.remove('show');
        }

        // Close on backdrop click
        document.addEventListener('click', function(e) {
          const modal = document.getElementById('shortcut-modal');
          if (e.target === modal) closeShortcutModal();
        });

        // Expose globally (called via onclick= in static + dynamic HTML)
        window.openShortcutModal   = openShortcutModal;
        window.closeShortcutModal  = closeShortcutModal;
        window.applyShortcutOption = applyShortcutOption;

        // ============================================================
        // SUMMER BRIDGE ENGINE
        // Detect courses currently scheduled in a First Term that
        // could be moved to a preceding summer semester (because their
        // prerequisites are already met by then). Moving them earlier
        // unlocks their dependents one full term sooner, often
        // collapsing the tail of the plan by 1–2 semesters.
        // ============================================================
        let _bridgeOptions = [];

        // Returns array of bridge options, each describing one
        // (summerSemIdx, courseCode) pair worth suggesting.
        // Also detects "virtual" summer slots — positions after a Second Term
        // that have no existing summer — and offers to insert a new one there.
        function computeBridgeOptions() {
          const plan = generatedPlans[currentPlanIndex];
          if (!plan || plan.semesters.length < 2) return [];

          const options = [];

          // ── Helper: collect bridge candidates for a given summer slot ────────
          // sumIdx        = real index in plan.semesters (-1 for virtual slots)
          // insertAfterIdx = index to splice after when creating a new summer
          // isNewSummer   = true when no real summer exists at that position yet
          // semName / usedH / SUMMER_MAX describe the (real or virtual) summer
          function scanSlot(sumIdx, insertAfterIdx, isNewSummer, semName, usedH, SUMMER_MAX, existingCoursesInSummer) {
            const available = SUMMER_MAX - usedH;

            // Build "completed before this summer" set
            const completedBefore = new Set(selected);
            // For a real summer, include all semesters before it.
            // For a virtual slot, include all semesters up to and including insertAfterIdx.
            const limitIdx = isNewSummer ? insertAfterIdx : sumIdx - 1;
            for (let i = 0; i <= limitIdx; i++)
              plan.semesters[i].courses.forEach(c => completedBefore.add(c));

            // Start of "later" semesters: right after the summer (real) or after insertAfterIdx (virtual).
            // IMPORTANT: Never scan the last semester of the plan — that is exclusively
            // Graduate Earlier's territory (it moves courses from the last First Term
            // into the previous Second Term so the last term converts to a Summer).
            const firstLaterIdx = isNewSummer ? insertAfterIdx + 1 : sumIdx + 1;
            const lastScanIdx   = plan.semesters.length - 2; // stop before the final semester

            for (let laterIdx = firstLaterIdx; laterIdx <= lastScanIdx; laterIdx++) {
              const laterSem = plan.semesters[laterIdx];

              for (const code of [...laterSem.courses]) {
                if (code === 'PC401' || code === 'PC402' || code === 'TR') continue;
                const c = courses[code];
                if (!c) continue;

                if (c.hours > available) continue;

                const prereqsMet = c.prerequisites.every(p => completedBefore.has(p));
                if (!prereqsMet) continue;

                const directDeps = Object.keys(courses).filter(dep =>
                  courses[dep].prerequisites.includes(code) &&
                  plan.semesters.some((s, si) => si >= firstLaterIdx && s.courses.includes(dep))
                );

                const completedAfterBridge = new Set(completedBefore);
                (existingCoursesInSummer || []).forEach(c2 => completedAfterBridge.add(c2));
                completedAfterBridge.add(code);

                const unlockedNow = directDeps.filter(dep =>
                  courses[dep].prerequisites.every(p => completedAfterBridge.has(p))
                );

                // ── Simulate how many semesters remain after applying this bridge ──
                // Collect every course scheduled AFTER the summer slot (excluding the bridged one).
                // Include the last semester here so the simulation counts it correctly.
                const simRemaining = [];
                for (let si = firstLaterIdx; si < plan.semesters.length; si++) {
                  plan.semesters[si].courses.forEach(rc => {
                    if (rc !== code) simRemaining.push(rc);
                  });
                }

                // Compute next term number after this summer
                const simYearM = semName.match(/(\d{4})/);
                const simYear  = simYearM ? parseInt(simYearM[1]) : (plan.term1BaseYear || 2025);
                const simT1b   = plan.term1BaseYear || 2025;
                const simNextTerm = (((simYear + 1) - simT1b) * 2) + 1;

                // Kept semesters count: real=[0..sumIdx], virtual=[0..insertAfterIdx]+newSummer
                const keptCount = isNewSummer ? insertAfterIdx + 2 : sumIdx + 1;

                // Run simulation (generateRemainingPlan is hoisted — available at call time)
                // ── Helper: term order for graduation-date comparison ──────────
                // Lower = earlier graduation. Each unit = ~1 term in calendar.
                // Summer Y-(Y+1) comes AFTER Second Term Y-(Y+1) but BEFORE First Term (Y+1)-(Y+2).
                function _semOrd(s) {
                  if (!s) return 999999;
                  const m = s.name.match(/(\d{4})/);
                  const y = m ? parseInt(m[1]) : 2030;
                  if (s.isSummer || s.name.includes('Summer') || s.name.includes('Special'))
                    return y * 10 + 5;  // Summer after Second Term of same year
                  if (s.name.includes('First'))  return y * 10 + 1;
                  if (s.name.includes('Second')) return y * 10 + 3;
                  return y * 10 + 3;
                }

                let simSemCount, simGradOrd, currentGradOrd, simRegularCount, currentRegularCount;
                try {
                  const simResult = generateRemainingPlan(
                    Array.from(completedAfterBridge),
                    simRemaining,
                    simNextTerm,
                    plan.term1BaseYear
                  );
                  simSemCount = keptCount + simResult.length;

                  // Calculate REGULAR semester counts (excluding summer)
                  const allSimSemesters = [...plan.semesters.slice(0, keptCount), ...simResult];
                  const simMetrics = calculateAcademicMetrics(allSimSemesters);
                  simRegularCount = simMetrics.regularSemesters;
                  
                  const currentMetrics = calculateAcademicMetrics(plan.semesters);
                  currentRegularCount = currentMetrics.regularSemesters;

                  // Fix yearless "Summer Term Special Case" names so _semOrd works correctly
                  simResult.forEach((sem, si) => {
                    if (!sem.name.match(/\d{4}/) && (sem.isSummer || sem.name.includes('Special') || sem.name.includes('Summer'))) {
                      let refYear = null;
                      for (let ri = si - 1; ri >= 0 && !refYear; ri--) {
                        const rm = simResult[ri].name.match(/(\d{4})/);
                        if (rm) refYear = parseInt(rm[1]);
                      }
                      if (!refYear) {
                        // Infer from simNextTerm: term N starts at year t1b + floor((N-1)/2)
                        const tIdx = Math.floor((simNextTerm - 1) / 2) + si;
                        refYear = simT1b + Math.floor(tIdx / 2);
                      }
                      sem.name = `Summer Term ${refYear}-${refYear+1} ⭐ Special Case`;
                    }
                  });

                  // Apply checkAndConvertLastOddSemester equivalent:
                  // if last sim semester is a First Term with ≤12h it would auto-convert to Summer.
                  let lastSim = simResult[simResult.length - 1];
                  if (lastSim && !lastSim.isSummer && lastSim.name.includes('First') && lastSim.hours <= 12) {
                    const prevSim = simResult.length > 1 ? simResult[simResult.length - 2] : null;
                    if (!prevSim || prevSim.name.includes('Second') || prevSim.isSummer) {
                      lastSim = { ...lastSim, isSummer: true }; // mark as summer for ord calc
                    }
                  }

                  // Also check current plan's last semester for the same auto-convert possibility
                  const curLast = plan.semesters[plan.semesters.length - 1];
                  let curLastAdj = curLast;
                  if (curLast && !curLast.isSummer && curLast.name.includes('First') && curLast.hours <= 12) {
                    const curPrev = plan.semesters[plan.semesters.length - 2];
                    if (!curPrev || curPrev.name.includes('Second') || curPrev.isSummer) {
                      curLastAdj = { ...curLast, isSummer: true };
                    }
                  }

                  simGradOrd     = _semOrd(lastSim);
                  currentGradOrd = _semOrd(curLastAdj);

                } catch(e) {
                  simSemCount    = plan.semesters.length;
                  simGradOrd     = 0;
                  currentGradOrd = 0;
                  simRegularCount = plan.semesters.filter(s => !s.isSummer && !s.name.toLowerCase().includes('summer')).length;
                  currentRegularCount = simRegularCount;
                }

                options.push({
                  sumIdx,           // -1 for virtual slots
                  insertAfterIdx,   // index to splice after (used when isNewSummer)
                  isNewSummer,
                  sumName:       semName,
                  sumUsed:       usedH,
                  sumMax:        SUMMER_MAX,
                  laterIdx,
                  laterSemName:  laterSem.name,
                  code,
                  name:          c.name,
                  hours:         c.hours,
                  directDeps,
                  unlockedNow,
                  currentSemCount: plan.semesters.length,
                  simulatedSemCount: simSemCount,
                  currentRegularCount: currentRegularCount,
                  simulatedRegularCount: simRegularCount,
                  currentGradOrd,
                  simGradOrd,
                });
              }
            }
          }

          // ── Pass 1: real existing summer semesters with remaining capacity ──
          plan.semesters.forEach((sem, sumIdx) => {
            if (!sem.isSummer) return;
            const SUMMER_MAX = sem.isSpecialCase ? 12 : 9;
            if (sem.hours >= SUMMER_MAX) return;
            scanSlot(sumIdx, sumIdx, false, sem.name, sem.hours, SUMMER_MAX, sem.courses);
          });

          // ── Pass 2: virtual summer slots (after any Second Term with no ──────
          //            summer immediately following it)
          plan.semesters.forEach((sem, idx) => {
            if (sem.isSummer) return;
            if (!sem.name.includes('Second Term')) return;
            // Check the very next semester — if it's already a summer, skip
            const next = plan.semesters[idx + 1];
            if (next && next.isSummer) return;

            // Derive year from the semester name
            const yearMatch = sem.name.match(/(\d{4})/);
            const year = yearMatch ? parseInt(yearMatch[1]) : (plan.term1BaseYear || 2024);
            const virtualName = `Summer ${year}-${year + 1} ☀️ (New)`;

            scanSlot(-1, idx, true, virtualName, 0, 9, []);
          });

          // De-duplicate (same slot+code from multiple laterIdx)
          const seen = new Set();
          const deduped = options.filter(o => {
            const slotKey = o.isNewSummer ? `new:${o.insertAfterIdx}` : `real:${o.sumIdx}`;
            const k = `${slotKey}:${o.code}`;
            if (seen.has(k)) return false;
            seen.add(k);
            return true;
          });

          // Sort: fewest REGULAR semesters first, then earliest graduation order,
          // then most unlocked, then earliest slot position
          deduped.sort((a, b) =>
            a.simulatedRegularCount - b.simulatedRegularCount ||
            a.simGradOrd        - b.simGradOrd        ||
            b.unlockedNow.length - a.unlockedNow.length ||
            (a.isNewSummer ? a.insertAfterIdx : a.sumIdx) - (b.isNewSummer ? b.insertAfterIdx : b.sumIdx) ||
            a.hours - b.hours
          );

          return deduped.slice(0, 8);
        }

        function refreshBridgeButton() {
          _bridgeOptions = computeBridgeOptions();
          const btn = document.getElementById('bridgeBtn');
          if (!btn) return;
          btn.classList.toggle('visible', _bridgeOptions.length > 0);
        }

        function openBridgeModal() {
          _bridgeOptions = computeBridgeOptions();
          if (_bridgeOptions.length === 0) {
            TechBot.notify('No Summer Bridge opportunities found in this plan.');
            return;
          }

          // Group by summer semester for the subtitle
          const summers = [...new Set(_bridgeOptions.map(o => o.sumName))];
          const hasNew = _bridgeOptions.some(o => o.isNewSummer);
          const bestOption = _bridgeOptions[0]; // sorted: fewest semesters / earliest graduation
          const regSemDiffBest = bestOption ? (bestOption.currentRegularCount - bestOption.simulatedRegularCount) : 0;
          const semDiffBest = bestOption ? (bestOption.currentSemCount - bestOption.simulatedSemCount) : 0;
          const gradDiffBest = bestOption ? ((bestOption.currentGradOrd||0) - (bestOption.simGradOrd||0)) : 0;
          let summaryNote = '';
          if (regSemDiffBest > 0) {
            summaryNote = ` Best option saves ${regSemDiffBest} regular semester${regSemDiffBest>1?'s':''}.`;
          } else if (gradDiffBest > 0) {
            summaryNote = ` Best option ends your plan earlier in the calendar.`;
          } else {
            summaryNote = ` Best option unlocks courses earlier.`;
          }
          const subtitleBase = hasNew ? `Some options create a new summer term automatically. ` : ``;
          document.getElementById('bridge-modal-subtitle').textContent =
            subtitleBase +
            `Ranked by graduation date (currently ${bestOption ? bestOption.currentRegularCount : '?'} regular semesters).` +
            summaryNote +
            ` Moving a course into summer unlocks its dependents one full term sooner.`;

          const grid = document.getElementById('bridge-options-grid');
          grid.innerHTML = '';

          _bridgeOptions.forEach((opt, idx) => {
            const card = document.createElement('div');
            card.className = 'bridge-option-card';

            const newSumHours = opt.sumUsed + opt.hours;

            // What gets unlocked now?
            const unlockedHTML = opt.unlockedNow.length > 0
              ? `<div class="bridge-unlock-list">
                   ⚡ Unlocks immediately after summer:<br>
                   <strong>${opt.unlockedNow
                     .map(d => `${d} – ${courses[d]?.name || d}`)
                     .join('<br>')}</strong>
                 </div>`
              : `<div class="bridge-unlock-list" style="background:#fefce8;border-color:#fde68a;color:#92400e;">
                   📦 Frees space in <strong>${opt.laterSemName}</strong>
                 </div>`;

            // Source semester short label
            const srcLabel = opt.laterSemName.replace(/(\d{4}-\d{4})/, '').trim();

            // Badge and optional new-summer note for virtual slots
            const badgeLabel = opt.isNewSummer
              ? `✨ Create ${opt.sumName.replace(' ☀️ (New)','')} + Move`
              : `🌞 Move to ${opt.sumName.replace('Summer Term ', 'Summer ').replace(' ⭐ Special Case','')}`;

            // ══ Compute reduction badge based on REGULAR semesters, not total ══
            const regSemDiff = opt.currentRegularCount - opt.simulatedRegularCount;
            const semDiff  = opt.currentSemCount - opt.simulatedSemCount;
            const gradDiff = (opt.currentGradOrd || 0) - (opt.simGradOrd || 0);

            // Convert graduation order to a short label like "Summer 2027-2028"
            function _ordLabel(ord) {
              if (!ord) return '?';
              const y   = Math.floor(ord / 10);
              const mod = ord % 10;
              if (mod >= 5) return `Summer ${y}-${y+1}`;
              if (mod === 1) return `First Term ${y}-${y+1}`;
              return `Second Term ${y}-${y+1}`;
            }

            let ribbonText, rankLabel;
            if (regSemDiff > 0) {
              // Reduced regular semester count
              ribbonText = `📅 <span style="text-decoration:line-through;opacity:0.85;">${opt.currentRegularCount} semesters</span> → ${opt.simulatedRegularCount} + ☀️ Summer ⭐ Saves ${regSemDiff} semester${regSemDiff>1?'s':''}!`;
              rankLabel = `#${idx + 1} · Saves ${regSemDiff} semester${regSemDiff>1?'s':''}`;
            } else if (gradDiff > 0) {
              // Same count but earlier graduation date
              ribbonText = `📅 ${opt.currentRegularCount} semesters → ${opt.simulatedRegularCount} + ☀️ Summer · Ends ${_ordLabel(opt.simGradOrd)} ✅ Earlier!`;
              rankLabel = `#${idx + 1} · Graduates earlier`;
            } else {
              // No timing improvement - check if summer is at end
              const isAtEnd = opt.insertAfterIdx >= (opt.currentSemCount - 1);
              const yearText = isAtEnd 
                ? 'Still completes in the same year'
                : 'Unlocks courses earlier';
              
              ribbonText = `📅 ${opt.currentRegularCount} semesters (unchanged) · ${yearText}`;
              rankLabel = isAtEnd ? `#${idx + 1} · Extends final year` : `#${idx + 1} · Unlocks earlier`;
            }

            const newSummerNote = opt.isNewSummer
              ? `<div style="font-size:11px;color:#0369a1;background:#e0f2fe;border:1px solid #bae6fd;border-radius:5px;padding:4px 8px;margin-bottom:8px;">
                   🆕 A new summer semester will be automatically added to your plan.
                 </div>`
              : '';

            card.innerHTML = `
              <div class="bridge-card-ribbon">${ribbonText}</div>
              <div class="bridge-card-body">
                <div class="bridge-option-badge">
                  ${badgeLabel} &nbsp;·&nbsp; <span style="opacity:.75;font-weight:500;">${rankLabel}</span>
                </div>
                ${newSummerNote}
                <div style="margin-bottom:10px;">
                  <div style="display:flex;align-items:center;gap:8px;margin-bottom:4px;">
                    <span style="font-family:monospace;background:#f3f4f6;padding:2px 7px;border-radius:5px;font-size:12px;">${opt.code}</span>
                    <span style="font-weight:700;font-size:14px;color:#0f172a;flex:1;">${opt.name}</span>
                    <span style="font-weight:700;color:#d97706;">${opt.hours}h</span>
                  </div>
                  <div style="font-size:12px;color:#64748b;">
                    Currently in: <strong>${srcLabel}</strong>
                  </div>
                </div>
                <div class="shortcut-result-preview" style="border-color:#fde68a;background:#fffbeb;">
                  <div class="shortcut-result-row">
                    <span class="shortcut-result-label" style="color:#92400e;">☀️ ${opt.sumName.replace('Term ','').replace(' ☀️ (New)','').replace(/\d{4}-\d{4}/,'').trim()}</span>
                    <span class="shortcut-result-hours">
                      <span class="old">${opt.isNewSummer ? '0h' : opt.sumUsed+'h'} / ${opt.sumMax}h</span>
                      <span class="new">${newSumHours}h / ${opt.sumMax}h</span>
                    </span>
                  </div>
                </div>
                ${unlockedHTML}
                <button class="bridge-apply-btn" onclick="applyBridgeOption(${idx})">
                  ✅ Apply This Bridge
                </button>
              </div>`;

            grid.appendChild(card);
          });

          const modal = document.getElementById('bridge-modal');
          modal.style.display = 'flex';
        }

        function applyBridgeOption(idx) {
          const opt  = _bridgeOptions[idx];
          const plan = generatedPlans[currentPlanIndex];
          if (!opt || !plan) return;

          UndoRedoManager.saveState(
            `Summer Bridge: moved ${opt.code} to ${opt.sumName}`
          );

          let realSumIdx = opt.sumIdx;

          // ── If this targets a virtual slot, insert a new summer semester ──
          if (opt.isNewSummer) {
            const afterSem = plan.semesters[opt.insertAfterIdx];
            const yearMatch = afterSem.name.match(/(\d{4})/);
            const year = yearMatch ? parseInt(yearMatch[1]) : (plan.term1BaseYear || 2024);

            const newSummer = {
              name: `Summer Term ${year}-${year + 1}`,
              courses: [],
              hours: 0,
              isSummer: true,
              isSpecialCase: false
            };

            // Insert the new summer immediately after the Second Term
            plan.semesters.splice(opt.insertAfterIdx + 1, 0, newSummer);
            realSumIdx = opt.insertAfterIdx + 1;

            // laterIdx has shifted by 1 because of the splice
            opt.laterIdx += 1;
          }

          const sumSem   = plan.semesters[realSumIdx];
          const laterSem = plan.semesters[opt.laterIdx];

          // Move course from its source semester to the summer
          const i = laterSem.courses.indexOf(opt.code);
          if (i > -1) {
            laterSem.courses.splice(i, 1);
            laterSem.hours -= opt.hours;
          }
          sumSem.courses.push(opt.code);
          sumSem.hours += opt.hours;

          closeBridgeModal();

          // Replan everything from the semester AFTER the summer so the
          // newly-unlocked dependents get pulled forward automatically.
          replanAfterMove(realSumIdx);
          TechBot.success(
            `🌞 Bridge applied! ${opt.code} moved to ${sumSem.name}. ` +
            `Plan re-optimized — check if semester count reduced!`
          );
        }

        function closeBridgeModal() {
          document.getElementById('bridge-modal').style.display = 'none';
        }

        // Close bridge modal on backdrop click
        document.addEventListener('click', function(e) {
          const m = document.getElementById('bridge-modal');
          if (e.target === m) closeBridgeModal();
        });

        window.openBridgeModal   = openBridgeModal;
        window.closeBridgeModal  = closeBridgeModal;
        window.applyBridgeOption = applyBridgeOption;

        function displayStudyPlan(planIndex) {
          const plan = generatedPlans[planIndex];
          if (!plan) return;

          // Auto-convert last odd semester to summer if hours dropped to ≤ 12
          checkAndConvertLastOddSemester(plan);

          // Calculate initial completed hours (before the plan starts)
          const initialCompletedHours = selected.reduce((sum, code) => {
            if (code === 'BMA001') return sum;
            return sum + (courses[code]?.hours || 0);
          }, 0);

          const displayDiv = document.getElementById('studyPlanDisplay');
          displayDiv.innerHTML = '';

          // Add action buttons at top
          const actionsDiv = document.createElement('div');
          actionsDiv.className = 'semester-actions';
          actionsDiv.innerHTML = `
            <button class="reset-plan-btn" id="resetPlanBtn">
              🔄 Reset Plan
            </button>
            <button class="export-btn" id="exportTextBtn">
              📄 Export as Text
            </button>
            <button class="export-btn xlsx" id="exportXlsxBtn">
              📊 Export as XLSX
            </button>
            <button class="export-btn pdf-btn" id="exportPdfBtn">
              🖨️ Export as PDF
            </button>
            <button class="shortcut-btn" id="shortcutBtn" onclick="openShortcutModal()">
              ⚡ Graduate Earlier?
            </button>
            <button class="bridge-btn" id="bridgeBtn" onclick="openBridgeModal()">
              🌞 Summer Bridge?
            </button>
            <div id="validationMessage"></div>
          `;
          displayDiv.appendChild(actionsDiv);

          plan.semesters.forEach((semester, semesterIndex) => {
            const semesterCard = document.createElement('div');
            semesterCard.className = `semester-card ${semester.isSummer ? 'summer-semester' : ''} ${semester.isSpecialCase ? 'special-case-active' : ''}`;
            semesterCard.dataset.semesterIndex = semesterIndex;

            // Calculate gained hours up to this semester (including initial completed hours)
            let gainedHours = initialCompletedHours;
            for (let i = 0; i <= semesterIndex; i++) {
              gainedHours += plan.semesters[i].hours;
            }
            
            // Calculate remaining hours
            const totalRequiredHours = 135;
            const remainingHours = totalRequiredHours - gainedHours;
            
            // Count number of courses in this semester
            const courseCount = semester.courses.length;

            // Special case star toggle
            const maxHoursLabel = semester.isSummer
              ? (semester.isSpecialCase ? '12h max' : '9h max')
              : (semester.isSpecialCase ? '21h max' : '18h max');
            const starToggleHTML = `
              <button class="special-case-toggle ${semester.isSpecialCase ? 'active' : ''}" 
                      data-semester-index="${semesterIndex}" 
                      title="${semester.isSpecialCase ? 'Remove special case' : 'Mark as special case (increases hour limit)'}">
                ${semester.isSpecialCase ? '⭐ Special Case' : '☆'}
              </button>`;
            
            const semesterHeader = document.createElement('div');
            semesterHeader.className = 'semester-header';
            semesterHeader.innerHTML = `
              <span class="semester-title">${semester.name}</span>
              <div style="display: flex; align-items: center; gap: 8px; flex-wrap: wrap;">
                ${starToggleHTML}
                <span class="semester-hours" id="hours-${semesterIndex}">${semester.hours}h (${courseCount} courses) (${maxHoursLabel.toUpperCase()})</span>
                ${semester.isSummer ? '<button class="delete-semester-btn" data-semester="' + semesterIndex + '">❌ Delete</button>' : ''}
              </div>
            `;

            const coursesDiv = document.createElement('div');
            coursesDiv.className = 'semester-courses';
            coursesDiv.dataset.semesterIndex = semesterIndex;

            // Add placeholder if empty
            if (semester.courses.length === 0) {
              coursesDiv.innerHTML = '<div style="color: #999; text-align: center; padding: 20px;">Drop courses here</div>';
            }

            // Make drop zone
            coursesDiv.addEventListener('dragover', handleDragOver);
            coursesDiv.addEventListener('drop', handleDrop);
            coursesDiv.addEventListener('dragleave', handleDragLeave);

            semester.courses.forEach((code, courseIndex) => {
              const course = courses[code];
              if (!course) return;
              
              const courseItem = document.createElement('div');
              courseItem.className = 'semester-course-item';
              courseItem.draggable = true;
              courseItem.dataset.courseCode = code;
              courseItem.dataset.semesterIndex = semesterIndex;
              courseItem.dataset.courseIndex = courseIndex;
              
              courseItem.innerHTML = `
                <span class="course-drag-handle">⋮⋮</span>
                <span class="semester-course-code">${code}</span>
                <span style="flex:1;">${course.name} (${course.hours}h)</span>
                <button class="course-remove-btn" data-code="${code}" data-semester="${semesterIndex}" title="Remove course (cascades dependents)">✕</button>
              `;

              // Drag events
              courseItem.addEventListener('dragstart', handleDragStart);
              courseItem.addEventListener('dragend', handleDragEnd);

              // Remove button
              courseItem.querySelector('.course-remove-btn').addEventListener('click', function(e) {
                e.stopPropagation();
                const code = this.dataset.code;
                const semIdx = parseInt(this.dataset.semester);
                removeCourseFromPlan(code, semIdx);
              });

              coursesDiv.appendChild(courseItem);
            });

            semesterCard.appendChild(semesterHeader);
            semesterCard.appendChild(coursesDiv);

            // Gained/Remaining footer at bottom of card
            const cardFooter = document.createElement('div');
            cardFooter.className = 'semester-footer';
            cardFooter.id = `footer-${semesterIndex}`;
            cardFooter.innerHTML = `
              <span class="footer-gained">📈 Gained: <strong>${gainedHours}h</strong></span>
              <span class="footer-sep">|</span>
              <span class="footer-remaining">🎯 Remaining: <strong>${remainingHours}h</strong></span>
            `;
            semesterCard.appendChild(cardFooter);
            
            // Add "Add Summer After This Semester" button ONLY after Second semesters (Spring)
            // Summer comes after spring, not after fall
            const isSecondSemester = semester.name.includes('Second Term') || semester.isSummer;
            
            if (isSecondSemester || semesterIndex === plan.semesters.length - 1) {
              // Show after second semesters or after the last semester (for flexibility)
              const addSummerDiv = document.createElement('div');
              addSummerDiv.style.textAlign = 'center';
              addSummerDiv.style.margin = '8px 0';
              addSummerDiv.innerHTML = `
                <button class="add-summer-after-btn" data-after-index="${semesterIndex}">
                  ☀️ Add Summer After This
                </button>
              `;
              semesterCard.appendChild(addSummerDiv);
            }
            
            displayDiv.appendChild(semesterCard);
          });

          // Add summary
          updatePlanSummary(plan);

          // Add event listeners for action buttons
          document.getElementById('resetPlanBtn').addEventListener('click', resetPlan);
          document.getElementById('exportTextBtn').addEventListener('click', () => exportAsText(planIndex));
          document.getElementById('exportXlsxBtn').addEventListener('click', () => exportAsXlsx(planIndex));
          document.getElementById('exportPdfBtn').addEventListener('click', () => exportStudyPlanAsPDF());
          
          // Delete semester buttons
          document.querySelectorAll('.delete-semester-btn').forEach(btn => {
            btn.addEventListener('click', function() {
              const semIndex = parseInt(this.dataset.semester);
              deleteSemester(semIndex);
            });
          });

          // Add summer after buttons
          document.querySelectorAll('.add-summer-after-btn').forEach(btn => {
            btn.addEventListener('click', function() {
              const afterIndex = parseInt(this.dataset.afterIndex);
              addSummerSemesterAfter(afterIndex);
            });
          });

          // Special case star toggle buttons
          document.querySelectorAll('.special-case-toggle').forEach(btn => {
            btn.addEventListener('click', function() {
              const semIdx = parseInt(this.dataset.semesterIndex);
              toggleSpecialCase(semIdx);
            });
          });
          
          // Auto-scroll to show the generated plan
          autoScrollToStudyPlan();

          // Update the ⚡ Graduate Earlier? button visibility
          refreshShortcutButton();
          // Update the 🌞 Summer Bridge? button visibility
          refreshBridgeButton();
        }

        // Update plan summary
        function updatePlanSummary(plan) {
          const displayDiv = document.getElementById('studyPlanDisplay');
          
          // Remove old summary if exists
          const oldSummary = displayDiv.querySelector('.plan-summary');
          if (oldSummary) oldSummary.remove();

          const totalHours = plan.semesters.reduce((sum, sem) => sum + sem.hours, 0);
          const totalSemesters = plan.semesters.length;
          const normalSemesters = plan.semesters.filter(s => !s.isSummer).length;
          const summerSemesters = plan.semesters.filter(s => s.isSummer).length;

          const summary = document.createElement('div');
          summary.className = 'plan-summary';
          summary.innerHTML = `
            <div class="plan-summary-title">📊 Plan Summary</div>
            <div class="plan-summary-stats">
              <div><strong>Total Hours:</strong> ${totalHours}h</div>
              <div><strong>Total Semesters:</strong> ${totalSemesters}</div>
              <div><strong>Normal Semesters:</strong> ${normalSemesters}</div>
              <div><strong>Summer Semesters:</strong> ${summerSemesters}</div>
            </div>
          `;
          displayDiv.appendChild(summary);
        }

        // Export as Text
        function exportAsText(planIndex) {
          const plan = generatedPlans[planIndex];
          if (!plan) return;

          let textContent = `Study Plan - ${plan.name}\n`;
          textContent += `=${'='.repeat(60)}\n\n`;
          
          // Student info
          if (studentInfo) {
            textContent += `Student: ${studentInfo.name || 'N/A'}\n`;
            textContent += `ID: ${studentInfo.id || 'N/A'}\n`;
            textContent += `Level: ${studentInfo.level || 'N/A'}\n`;
          }
          
          const totalHours = plan.semesters.reduce((sum, sem) => sum + sem.hours, 0);
          const completedHours = selected.reduce((sum, code) => sum + (courses[code]?.hours || 0), 0);
          const remainingHours = 135 - completedHours;
          
          textContent += `Total Credits: ${completedHours}/135\n`;
          textContent += `GPA: ${studentInfo?.gpa || '0.00'}\n`;
          textContent += `Generated: ${new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}\n`;
          textContent += `\n${'-'.repeat(60)}\n\n`;

          plan.semesters.forEach((semester, index) => {
            // Calculate gained hours up to this semester (including initial completed hours)
            let gainedHours = completedHours;
            for (let i = 0; i <= index; i++) {
              gainedHours += plan.semesters[i].hours;
            }
            
            // Calculate remaining hours
            const remainingHours = 135 - gainedHours;
            const courseCount = semester.courses.length;
            
            const specialCase = semester.isSpecialCase ? ' ⭐ Special Case' : '';
            textContent += `${semester.name} - ${semester.hours} hours (${courseCount} courses)${specialCase}\n`;
            textContent += `Gained: ${gainedHours}h | Remaining: ${remainingHours}h\n`;
            textContent += `${'-'.repeat(60)}\n`;
            
            semester.courses.forEach(code => {
              const course = courses[code];
              if (course) {
                textContent += `  ${code.padEnd(10)} ${course.name.padEnd(45)} ${course.hours}h\n`;
              }
            });
            textContent += `\n`;
          });

          textContent += `${'-'.repeat(60)}\n`;
          textContent += `TOTAL: ${totalHours}h | ${plan.semesters.length} Semesters\n`;
          textContent += `${'-'.repeat(60)}\n`;
          textContent += `\nStudy Plan generated by Course Planning System\n`;
          textContent += `This plan is subject to course availability and prerequisite validation\n`;

          // Download
          const blob = new Blob([textContent], { type: 'text/plain' });
          const url = URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = `Study_Plan_${plan.name.replace(/[^a-zA-Z0-9]/g, '_')}_${new Date().toISOString().split('T')[0]}.txt`;
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
          URL.revokeObjectURL(url);
        }

        // Export as XLSX
        function exportAsXlsx(planIndex) {
          const plan = generatedPlans[planIndex];
          if (!plan) return;

          // Create workbook matching the reference Excel structure
          const wb = XLSX.utils.book_new();
          const data = [];
          
          // Row 1-2: Empty
          data.push([]);
          data.push([]);
          
          // Rows 3-6: Student Information in columns H-I
          const studentName = studentInfo?.name || 'Student Name';
          const studentId = studentInfo?.id || 'N/A';
          const studentCenter = studentInfo?.level || 'Computer Science Program';
          const completedHours = selected.reduce((sum, code) => sum + (courses[code]?.hours || 0), 0);
          const studentGPA = studentInfo?.gpa || '0.00';
          
          data.push(['', '', '', '', '', '', '', 'Name:', studentName]);
          data.push(['', '', '', '', '', '', '', 'ID:', studentId]);
          data.push(['', '', '', '', '', '', '', 'Center:', studentCenter]);
          data.push(['', '', '', '', '', '', '', 'Gained Hours:', completedHours]);
          data.push(['', '', '', '', '', '', '', 'GPA:', studentGPA]);
          
          // Row 8: Empty
          data.push([]);
          
          // Row 9: Header for completed courses
          data.push(['', '', '', '', '', '', '', 'All Passed Till Now', 'Hours']);
          
          // Add completed courses
          const completedStartRow = data.length + 1; // Excel is 1-indexed
          let math0Row = null;
          
          selected.forEach((code, index) => {
            const course = courses[code];
            if (course) {
              data.push(['', '', '', '', '', '', '', course.name, course.hours]);
              // Track Mathematics - 0 or similar for formula
              if (course.name.includes('Mathematics - 0') || course.name.includes('Mathematics-0')) {
                math0Row = completedStartRow + index;
              }
            }
          });
          
          const completedEndRow = data.length;
          
          // Completed courses total with formula
          const completedTotalFormula = math0Row 
            ? `SUM(I${completedStartRow}:I${completedEndRow})-I${math0Row}`
            : `SUM(I${completedStartRow}:I${completedEndRow})`;
          data.push(['', '', '', '', '', '', '', 'Total Hours', { f: completedTotalFormula }]);
          const completedTotalRow = data.length;
          
          // Empty row
          data.push([]);
          
          // Planned semesters
          const semesterTotalRows = [];
          plan.semesters.forEach((semester) => {
            // Semester header
            const semesterTitle = semester.name || 'Semester';
            data.push(['', '', '', '', '', '', '', semesterTitle, 'Hours']);
            
            const semStartRow = data.length + 1;
            semester.courses.forEach(code => {
              const course = courses[code];
              if (course) {
                data.push(['', '', '', '', '', '', '', course.name, course.hours]);
              }
            });
            const semEndRow = data.length;
            
            // Semester total with formula - only add "دواعي تخرج" if special case
            const totalRow = ['', '', '', '', '', '', '', 'Total Hours', { f: `SUM(I${semStartRow}:I${semEndRow})` }];
            if (semester.isSpecialCase) {
              totalRow.push('دواعي تخرج');
            }
            data.push(totalRow);
            semesterTotalRows.push(data.length);
            
            // Empty row after each semester
            data.push([]);
          });
          
          // Grand total
          const semTotalRefs = semesterTotalRows.map(row => `I${row}`).join(',');
          const grandTotalFormula = semesterTotalRows.length > 0
            ? `SUM(I${completedTotalRow},${semTotalRefs})`
            : `I${completedTotalRow}`;
          data.push(['', '', '', '', '', '', '', 'Total Hours', { f: grandTotalFormula }]);
          
          // Create worksheet from data
          const ws = XLSX.utils.aoa_to_sheet(data);
          
          // Set column widths matching reference structure
          ws['!cols'] = [
            {wch: 3}, {wch: 3}, {wch: 3}, {wch: 3}, {wch: 3}, {wch: 3}, {wch: 3},
            {wch: 45}, {wch: 12}, {wch: 15}
          ];
          
          // Add worksheet to workbook
          XLSX.utils.book_append_sheet(wb, ws, 'Student Plan');
          
          // Generate filename with Arabic support
          const filename = `دواعي_تخرج_-_${studentName.replace(/\s+/g, '_')}_-_${studentId}.xlsx`;
          
          // Download
          XLSX.writeFile(wb, filename);
          
          TechBot.success('Excel file exported successfully! ✅');
        }

        // Drag and Drop Handlers
        let draggedElement = null;
        let draggedCourseCode = null;
        let draggedFromSemester = null;
        let autoScrollInterval = null;
        let scrollSpeed = 0;

        function handleDragStart(e) {
          draggedElement = e.target;
          draggedCourseCode = e.target.dataset.courseCode;
          // -1 means dragging from an external source (courses table or remaining list)
          draggedFromSemester = e.target.dataset.semesterIndex !== undefined 
            ? parseInt(e.target.dataset.semesterIndex) 
            : -1;
          
          e.target.classList.add('dragging');
          e.dataTransfer.effectAllowed = 'move';
          e.dataTransfer.setData('text/plain', draggedCourseCode);
        }

        function handleDragEnd(e) {
          e.target.classList.remove('dragging');
          e.target.style.opacity = '';
          
          // Clear drag state so stale values can never be re-used
          draggedCourseCode = null;
          draggedFromSemester = null;
          draggedElement = null;
          
          // Stop auto-scrolling
          if (autoScrollInterval) {
            clearInterval(autoScrollInterval);
            autoScrollInterval = null;
            scrollSpeed = 0;
          }
          
          // Remove all drag-over effects
          document.querySelectorAll('.semester-courses').forEach(el => {
            el.classList.remove('drag-over');
          });
          document.querySelectorAll('.semester-card').forEach(el => {
            el.classList.remove('invalid-drop');
          });
        }

        function handleDragOver(e) {
          if (e.preventDefault) {
            e.preventDefault();
          }
          
          const dropZone = e.target.closest('.semester-courses');
          if (dropZone) {
            dropZone.classList.add('drag-over');
          }
          
          e.dataTransfer.dropEffect = 'move';
          
          // Auto-scroll when dragging near edges
          const scrollThreshold = 100; // Distance from edge to trigger scroll (pixels)
          const maxScrollSpeed = 20; // Maximum scroll speed (pixels per frame)
          const mouseY = e.clientY;
          const windowHeight = window.innerHeight;
          
          // Calculate scroll speed based on proximity to edge
          let newScrollSpeed = 0;
          
          if (mouseY < scrollThreshold) {
            // Near top edge - scroll up
            const proximity = 1 - (mouseY / scrollThreshold);
            newScrollSpeed = -Math.ceil(proximity * maxScrollSpeed);
          } else if (mouseY > windowHeight - scrollThreshold) {
            // Near bottom edge - scroll down
            const proximity = (mouseY - (windowHeight - scrollThreshold)) / scrollThreshold;
            newScrollSpeed = Math.ceil(proximity * maxScrollSpeed);
          }
          
          // Update scroll speed
          scrollSpeed = newScrollSpeed;
          
          // Start or stop scrolling interval
          if (scrollSpeed !== 0 && !autoScrollInterval) {
            autoScrollInterval = setInterval(() => {
              if (scrollSpeed !== 0) {
                window.scrollBy(0, scrollSpeed);
              }
            }, 16); // ~60fps
          } else if (scrollSpeed === 0 && autoScrollInterval) {
            clearInterval(autoScrollInterval);
            autoScrollInterval = null;
          }
          
          return false;
        }

        function handleDragLeave(e) {
          const dropZone = e.target.closest('.semester-courses');
          if (dropZone && !dropZone.contains(e.relatedTarget)) {
            dropZone.classList.remove('drag-over');
          }
        }

        // Drop guard — prevents double-fire within the same browser tick
        let _dropHandled = false;
        // ============================================================
        // VALIDATE SUMMER/NORMAL SEMESTER PLACEMENT
        // ============================================================
        function validateSummerPlacement(courseCode, toSemester) {
          const course = courses[courseCode];
          if (!course) return { valid: false, message: 'Course not found' };

          // Rule 1: Summer Training (TR) can ONLY be in summer
          if (isSummerTraining(courseCode)) {
            if (!toSemester.isSummer) {
              return { 
                valid: false, 
                message: 'TR (Summer Training) can ONLY be taken in summer semesters' 
              };
            }
            return { valid: true, message: 'Summer Training placed in summer ✓' };
          }

          // Rule 2: Projects CANNOT be in summer
          if (isProjectCourse(courseCode)) {
            if (toSemester.isSummer) {
              return { 
                valid: false, 
                message: `${course.name} (Project) cannot be taken in summer semester` 
              };
            }
            return { valid: true };
          }

          // Rule 3: For summer semesters - all other courses CAN be placed
          if (toSemester.isSummer) {
            // Check hour limits
            const maxSummerHours = toSemester.isSpecialCase ? 12 : 9;
            const newHours = toSemester.hours + course.hours;
            
            if (newHours > maxSummerHours) {
              return { 
                valid: false, 
                message: `Summer limit is ${maxSummerHours}h — adding this would reach ${newHours}h` 
              };
            }
            
            // Electives get a message that they CAN be in summer
            if (isElectiveCourse(courseCode)) {
              return { 
                valid: true, 
                message: `✓ Elective course placed in summer (can help reduce graduation time)` 
              };
            }
            
            return { valid: true, message: '✓ Course placed in summer' };
          }

          // Rule 4: For normal semesters - TR cannot be placed
          if (isSummerTraining(courseCode)) {
            return { 
              valid: false, 
              message: 'TR (Summer Training) can ONLY be taken in summer semesters' 
            };
          }

          return { valid: true };
        }



        function handleDrop(e) {
          if (e.stopPropagation) e.stopPropagation();
          e.preventDefault();

          // Stop auto-scrolling
          if (autoScrollInterval) {
            clearInterval(autoScrollInterval);
            autoScrollInterval = null;
            scrollSpeed = 0;
          }

          // Guard: ignore if this drop was already handled this tick
          if (_dropHandled) return;
          _dropHandled = true;
          setTimeout(() => { _dropHandled = false; }, 0);

          // Guard: no course being dragged
          if (!draggedCourseCode) return;

          const dropTarget = e.target.closest('.semester-courses');
          if (!dropTarget) return;

          const toSemesterIndex = parseInt(dropTarget.dataset.semesterIndex);
          if (isNaN(toSemesterIndex)) return;

          console.log(`Drop event: from ${draggedFromSemester} to ${toSemesterIndex}`);

          // ── External drag (from courses table or remaining courses list) ──
          if (draggedFromSemester === -1) {
            const plan = generatedPlans[currentPlanIndex];
            if (!plan) return;

            const course = courses[draggedCourseCode];
            if (!course) {
              TechBot.error(`Unknown course "${draggedCourseCode}"`);
              return;
            }

            // 1. Already completed / selected by student
            const uniqueSelected = [...new Set(selected)];
            if (uniqueSelected.includes(draggedCourseCode)) {
              TechBot.warning(`"${course.name}" is already marked as completed`);
              return;
            }

            // 2. Already scheduled in any semester of the plan
            const alreadyScheduled = plan.semesters.some(sem =>
              sem.courses.includes(draggedCourseCode)
            );
            if (alreadyScheduled) {
              TechBot.warning(`"${course.name}" is already in the study plan`);
              return;
            }

            const toSemester = plan.semesters[toSemesterIndex];

            // 🆕 NEW: Validate summer/normal placement
            const semesterValidation = validateSummerPlacement(draggedCourseCode, toSemester);
            if (!semesterValidation.valid) {
              TechBot.error(semesterValidation.message);
              return;
            }

            // 4. Prerequisite validation
            const prereqValidation = validatePrerequisites(draggedCourseCode, toSemesterIndex);
            if (!prereqValidation.valid) {
              TechBot.error(prereqValidation.message);
              return;
            }

            // 5. Course-specific constraints (Summer Training, Project 1, Project 2)
            const allSemesters = plan.semesters;
            const completedCredits = CourseConstraints.calculateCompletedCredits(
              document.querySelectorAll('.semester-card'), 
              toSemesterIndex
            );
            const completedCourses = CourseConstraints.getCompletedCourses(
              document.querySelectorAll('.semester-card'), 
              toSemesterIndex
            );
            
            const semesterType = toSemester.isSummer ? 'Summer' : 
                                (toSemesterIndex % 2 === 0 ? 'Odd' : 'Even');
            
            const constraintCheck = CourseConstraints.canAddCourse(
              course.name, 
              semesterType, 
              toSemesterIndex,
              completedCredits,
              completedCourses
            );
            
            if (!constraintCheck.allowed) {
              TechBot.error(constraintCheck.reason);
              return;
            }

            // Save state for undo
            UndoRedoManager.saveState(`Added ${draggedCourseCode} to ${toSemester.name}`);

            // Odd/Even type warning for external drop
            if (!toSemester.isSummer) {
              const extSemType = getSemesterType(course.semester);
              const extTermType = toSemester.name.includes('First') ? 1 : 2;
              if (extSemType && extSemType !== extTermType) {
                const fl = extSemType === 1 ? 'First (Odd/Fall)' : 'Second (Even/Spring)';
                const tl = extTermType === 1 ? 'First (Odd/Fall)' : 'Second (Even/Spring)';
                TechBot.warning(`⚠️ "${course.name}" is a ${fl} course added to a ${tl} semester. Check your plan carefully.`);
              }
            }

            // All checks passed — add the course
            toSemester.courses.push(draggedCourseCode);
            toSemester.hours += course.hours;
            displayStudyPlan(currentPlanIndex);
            // Show appropriate success message
            if (semesterValidation.message) {
              TechBot.success(semesterValidation.message);
            } else {
              TechBot.success(`Added "${course.name}" to ${toSemester.name} ✓`);
            }
            return;
          }

          // ── Internal drag (within the study plan) ──

          // Don't drop on same semester
          if (draggedFromSemester === toSemesterIndex) {
            TechBot.error('Course is already in this semester');
            return;
          }

          // Validate the move
          const validation = validateCourseMove(draggedCourseCode, draggedFromSemester, toSemesterIndex);
          if (!validation.valid) {
            TechBot.error(validation.message);
            return;
          }

          moveCourse(draggedCourseCode, draggedFromSemester, toSemesterIndex);
          if (validation.isWarning) {
            TechBot.warning(validation.message);
          } else {
            TechBot.success(validation.message || 'Course moved successfully! ✓');
          }
        }

        // Validate if a course can be moved
        function validateCourseMove(courseCode, fromIndex, toIndex) {
          const plan = generatedPlans[currentPlanIndex];
          const toSemester = plan.semesters[toIndex];
          const course = courses[courseCode];

          if (!course) {
            return { valid: false, message: 'Course not found' };
          }

          // 🆕 NEW: Validate summer/normal placement
          const semesterValidation = validateSummerPlacement(courseCode, toSemester);
          if (!semesterValidation.valid) {
            return semesterValidation;
          }

          // ── Odd/Even semester type mismatch warning ──
          let semesterTypeWarning = null;
          if (!toSemester.isSummer) {
            const courseSemType = getSemesterType(course.semester);
            const toTermType = toSemester.name.includes('First') ? 1 : 2;
            if (courseSemType && courseSemType !== toTermType) {
              const fromLabel = courseSemType === 1 ? 'First (Odd/Fall)' : 'Second (Even/Spring)';
              const toLabel   = toTermType   === 1 ? 'First (Odd/Fall)' : 'Second (Even/Spring)';
              semesterTypeWarning = `⚠️ "${course.name}" is a ${fromLabel} semester course being moved to a ${toLabel} semester. This is an irregular placement — double-check your plan.`;
            }
          }

          // Calculate new hours
          const newHours = toSemester.hours + course.hours;
          
          // Check hour limits
          if (toSemester.isSummer) {
            const maxSummerHours = toSemester.isSpecialCase ? 12 : 9;
            if (newHours > maxSummerHours) {
              return { 
                valid: false, 
                message: `Summer limit is ${maxSummerHours}h (would be ${newHours}h)` 
              };
            }
          } else {
            const maxHours = toSemester.isSpecialCase ? 21 : 18;
            if (newHours > maxHours) {
              return { 
                valid: false, 
                message: `Semester limit is ${maxHours}h (would be ${newHours}h)` 
              };
            }
          }

          // Check prerequisites are met
          const validation = validatePrerequisites(courseCode, toIndex);
          if (!validation.valid) {
            return validation;
          }

          if (semesterTypeWarning) {
            return { valid: true, message: semesterTypeWarning, isWarning: true };
          }

          // Return success with message if available
          return { 
            valid: true, 
            message: semesterValidation.message || 'Course moved successfully! ✓' 
          };
        }

        // Validate prerequisites for a course in a specific semester
        function validatePrerequisites(courseCode, semesterIndex) {
          const plan = generatedPlans[currentPlanIndex];
          const course = courses[courseCode];
          
          // Get all courses completed before this semester
          const completedBefore = new Set(selected); // Already completed
          
          for (let i = 0; i < semesterIndex; i++) {
            plan.semesters[i].courses.forEach(code => completedBefore.add(code));
          }

          // Check if all prerequisites are met
          const unmetPrereqs = course.prerequisites.filter(prereq => !completedBefore.has(prereq));
          
          if (unmetPrereqs.length > 0) {
            return { 
              valid: false, 
              message: `Missing prerequisites: ${unmetPrereqs.join(', ')}. Complete these first or move to a later semester.` 
            };
          }

          return { valid: true };
        }

        // Move course between semesters and re-plan
        function moveCourse(courseCode, fromIndex, toIndex) {
          const plan = generatedPlans[currentPlanIndex];
          
          console.log(`Moving ${courseCode} from semester ${fromIndex} to ${toIndex}`);
          
          // Save state for undo
          UndoRedoManager.saveState(`Moved ${courseCode} from ${plan.semesters[fromIndex].name} to ${plan.semesters[toIndex].name}`);
          
          // Store the course being moved
          const movedCourse = courses[courseCode];
          
          // Remove from source semester
          const fromSemester = plan.semesters[fromIndex];
          const courseIndex = fromSemester.courses.indexOf(courseCode);
          if (courseIndex > -1) {
            fromSemester.courses.splice(courseIndex, 1);
            fromSemester.hours -= movedCourse.hours;
            console.log(`Removed from semester ${fromIndex}, new hours: ${fromSemester.hours}`);
          }

          // Add to destination semester
          const toSemester = plan.semesters[toIndex];
          toSemester.courses.push(courseCode);
          toSemester.hours += movedCourse.hours;
          console.log(`Added to semester ${toIndex}, new hours: ${toSemester.hours}`);

          // RE-PLAN: Re-optimize from the earlier affected semester
          // If we moved to an earlier semester (toIndex < fromIndex):
          //   - The destination semester (toIndex) is now locked with the new course
          //   - Re-plan from the semester after it to optimize the rest
          // If we moved to a later semester (toIndex > fromIndex):
          //   - The source semester (fromIndex) now has a gap
          //   - Re-plan from fromIndex to fill the gap and optimize
          
          const replanStartIndex = toIndex < fromIndex ? toIndex : fromIndex;
          console.log(`Triggering re-plan from semester ${replanStartIndex} onwards`);
          replanAfterMove(replanStartIndex);
          
          console.log('Move completed');
        }

        // Re-plan remaining semesters after a course move
        function replanAfterMove(fromIndex) {
          const plan = generatedPlans[currentPlanIndex];
          
          console.log(`Re-planning from semester ${fromIndex} onwards`);
          TechBot.notify('Re-optimizing plan...');
          
          // Collect all completed courses up to and including the target semester
          const completedCourses = new Set([...selected]); // Already completed from transcript
          
          for (let i = 0; i <= fromIndex; i++) {
            plan.semesters[i].courses.forEach(code => completedCourses.add(code));
          }
          
          console.log('Completed courses:', Array.from(completedCourses));
          
          // Collect all remaining courses from semesters after the move point
          const remainingCourses = [];
          for (let i = fromIndex + 1; i < plan.semesters.length; i++) {
            remainingCourses.push(...plan.semesters[i].courses);
          }
          
          console.log('Courses to re-schedule:', remainingCourses);
          
          // Keep semesters up to and including the target
          const semestersToKeep = plan.semesters.slice(0, fromIndex + 1);
          
          // Determine the starting point for re-planning
          // Calculate based on the semester we just filled
          const lastKeptSemester = semestersToKeep[semestersToKeep.length - 1];
          let nextTermNumber;
          
          if (lastKeptSemester.isSummer) {
            // If last kept was summer, next is the following fall/spring term.
            // "Summer Term YYYY-(YYYY+1)" → next is First Term (YYYY+1)-(YYYY+2).
            // We need the SECOND year in the range, so use year + 1.
            const yearMatch = lastKeptSemester.name.match(/(\d{4})/);
            if (yearMatch) {
              const year = parseInt(yearMatch[1]);     // first year, e.g. 2025
              const t1b = plan.term1BaseYear || 2024;
              // First Term (year+1) = ((year+1 - t1b) * 2) + 1
              nextTermNumber = (((year + 1) - t1b) * 2) + 1;
            } else {
              nextTermNumber = fromIndex + 2; // Default fallback
            }
          } else {
            // Regular semester - just increment
            // Determine current term type from the semester name
            const isFirstTerm = lastKeptSemester.name.includes('First');
            const yearMatch = lastKeptSemester.name.match(/(\d{4})/);
            
            if (yearMatch) {
              const year = parseInt(yearMatch[1]);
              const t1b = plan.term1BaseYear || 2024;
              const baseYear = year - t1b;
              
              if (isFirstTerm) {
                // After first term comes second term of same academic year
                nextTermNumber = (baseYear * 2) + 2;
              } else {
                // After second term comes first term of next academic year
                nextTermNumber = ((baseYear + 1) * 2) + 1;
              }
            } else {
              nextTermNumber = fromIndex + 2; // Default fallback
            }
          }
          
          console.log(`Next term number: ${nextTermNumber}`);
          
          // Re-generate the plan for remaining courses
          const newSemesters = generateRemainingPlan(
            Array.from(completedCourses),
            remainingCourses,
            nextTermNumber,
            plan.term1BaseYear   // ← pass override so year labels stay correct
          );
          
          // Replace the plan
          plan.semesters = [...semestersToKeep, ...newSemesters];
          
          console.log('Re-plan complete, new semester count:', plan.semesters.length);
          
          // Refresh display
          displayStudyPlan(currentPlanIndex);
          TechBot.success('Plan re-optimized successfully!');
        }

        // Generate plan for remaining courses
        function generateRemainingPlan(completedCourses, remainingCourses, startTermNumber, term1BaseYearOverride) {
          const newSemesters = [];
          let completed = [...completedCourses];
          let toSchedule = [...remainingCourses];
          
          // Calculate current credit hours
          const calculateHours = (courseList) => {
            return courseList.reduce((sum, code) => {
              if (code === 'BMA001') return sum;
              return sum + (courses[code]?.hours || 0);
            }, 0);
          };
          
          let currentHours = calculateHours(completed);
          let currentTermNumber = startTermNumber;
          const maxIterations = 12;
          let iterations = 0;
          
          // ==========================================
          // CALCULATE BASE YEAR FROM CURRENT DATE
          // ==========================================
          const now = new Date();
          const currentCalendarYear = now.getFullYear();
          const currentMonth = now.getMonth() + 1;
          const currentAcademicYear = (currentMonth >= 9) ? currentCalendarYear : currentCalendarYear - 1;
          const startTermYearIndex = Math.floor((startTermNumber - 1) / 2);
          // Use override if provided (fixes year labels when replanning mid-plan)
          const term1BaseYear = (term1BaseYearOverride !== undefined)
            ? term1BaseYearOverride
            : (currentAcademicYear - startTermYearIndex);
          
          console.log(`Re-planning from term ${currentTermNumber}, ${toSchedule.length} courses to schedule`);
          
          while (toSchedule.length > 0 && iterations < maxIterations) {
            iterations++;
            
            const termType = (currentTermNumber % 2 === 1) ? 1 : 2;
            console.log(`\n--- Re-planning term ${currentTermNumber} (type ${termType}) ---`);
            
            const remainingHours = calculateHours(toSchedule);
            console.log(`   Remaining: ${toSchedule.length} courses, ${remainingHours}h`);
            
            let maxHours = 18;
            
            // FILTER: Get courses available for this term
            let available = toSchedule.filter(code => {
              const course = courses[code];
              if (!course) return false;
              
              // Semester type must match
              const courseSemesterType = getSemesterType(course.semester);
              if (courseSemesterType !== termType) return false;
              
              // Prerequisites must be met
              const prereqsMet = course.prerequisites.every(prereq => completed.includes(prereq));
              if (!prereqsMet) return false;
              
              // TR only in summer
              if (code === 'TR') return false;
              
              // PC401 requires 85+ hours
              if (code === 'PC401' && currentHours < 85) return false;
              
              return true;
            });
            
            console.log(`   ${available.length} courses available`);
            
            // PRIORITIZE
            available = available.map(code => {
              const unlocks = Object.keys(courses).filter(c => 
                courses[c].prerequisites.includes(code) && toSchedule.includes(c)
              ).length;
              
              let priority = unlocks;
              if (code === 'PC401' && currentHours >= 85) priority = 1000;
              else if (code === 'PC402' && completed.includes('PC401')) priority = 999;
              
              return { code, priority, hours: courses[code].hours };
            });
            
            available.sort((a, b) => {
              if (b.priority !== a.priority) return b.priority - a.priority;
              return b.hours - a.hours;
            });
            
            available = available.map(item => item.code);
            
            // SELECT courses
            const termCourses = [];
            let termHours = 0;
            
            for (const code of available) {
              const courseHours = courses[code].hours;
              if (termHours + courseHours <= maxHours) {
                termCourses.push(code);
                termHours += courseHours;
              }
            }
            
            if (termCourses.length === 0) {
              console.log('   No courses available, stopping');
              break;
            }
            
            // Add semester
            const termYearIndex = Math.floor((currentTermNumber - 1) / 2);
            const year = term1BaseYear + termYearIndex;
            const termName = termType === 1 ? 'First' : 'Second';
            
            newSemesters.push({
              name: `${termName} Term ${year}-${year + 1}`,
              courses: termCourses,
              hours: termHours,
              isSummer: false,
              isSpecialCase: false
            });
            
            completed.push(...termCourses);
            toSchedule = toSchedule.filter(code => !termCourses.includes(code));
            currentHours = calculateHours(completed);
            
            console.log(`   Added ${termCourses.length} courses (${termHours}h). Total: ${currentHours}h`);
            
            // ==========================================
            // POST-SEMESTER CHECKS
            // ==========================================
            
            // CHECK 1: TR Summer
            if (termType === 2 && toSchedule.includes('TR') && currentHours >= 60) {
              console.log(`   🌞 TR condition met, adding TR summer`);
              
              const trPrereqsMet = courses['TR'].prerequisites.every(prereq => completed.includes(prereq));
              if (trPrereqsMet) {
                newSemesters.push({
                  name: `Summer Term ${year}-${year + 1}`,
                  courses: ['TR'],
                  hours: 2,
                  isSummer: true,
                  isSpecialCase: false
                });
                
                completed.push('TR');
                toSchedule = toSchedule.filter(code => code !== 'TR');
                currentHours = calculateHours(completed);
                
                console.log(`   ✅ Added TR summer. Total: ${currentHours}h`);
              }
            }
            
            // Recalculate remaining
            const newRemainingHours = calculateHours(toSchedule);
            
            // CHECK 3: Special Summer (≤12h after even semester - REGARDLESS of type mix)
            // This check must come BEFORE CHECK 2 because it's more specific
            if (termType === 2 && newRemainingHours > 0 && newRemainingHours <= 12 && toSchedule.length > 0) {
              console.log(`   ⭐ Special summer case: ${newRemainingHours}h after even semester`);
              
              const summerCourses = toSchedule.filter(code => {
                const course = courses[code];
                if (!course) return false;
                
                const prereqsMet = course.prerequisites.every(prereq => completed.includes(prereq));
                if (!prereqsMet) return false;
                
                if (code === 'TR' && currentHours < 60) return false;
                if (code === 'PC401' || code === 'PC402') return false;
                
                return true;
              });
                
              if (summerCourses.length > 0) {
                let summerHours = 0;
                const selectedSummer = [];
                
                const prioritizedSummer = summerCourses.map(code => {
                  const unlocks = Object.keys(courses).filter(c => 
                    courses[c].prerequisites.includes(code) && toSchedule.includes(c)
                  ).length;
                  return { code, unlocks, hours: courses[code].hours };
                }).sort((a, b) => {
                  if (b.unlocks !== a.unlocks) return b.unlocks - a.unlocks;
                  return b.hours - a.hours;
                });
                
                for (const item of prioritizedSummer) {
                  if (summerHours + item.hours <= 12) {
                    selectedSummer.push(item.code);
                    summerHours += item.hours;
                  }
                }
                
                if (selectedSummer.length > 0) {
                  newSemesters.push({
                    name: `Summer Term Special Case`,
                    courses: selectedSummer,
                    hours: summerHours,
                    isSummer: true,
                    isSpecialCase: true
                  });
                  
                  completed.push(...selectedSummer);
                  toSchedule = toSchedule.filter(code => !selectedSummer.includes(code));
                  currentHours = calculateHours(completed);
                  
                  console.log(`   ✅ Added special summer: ${selectedSummer.length} courses`);
                }
              }
            }
            
            // Recalculate again after potential summer addition
            const finalRemainingHours = calculateHours(toSchedule);
            
            // CHECK 2: Special 21-Hour Semester
            // This check comes AFTER CHECK 3 (more general fallback)
            if (finalRemainingHours > 0 && finalRemainingHours <= 21 && toSchedule.length > 0) {
              const remainingSemesterTypes = toSchedule.map(code => {
                const course = courses[code];
                return course ? getSemesterType(course.semester) : null;
              }).filter(t => t !== null);
              
              const allType1 = remainingSemesterTypes.every(t => t === 1);
              const allType2 = remainingSemesterTypes.every(t => t === 2);
              
              if (allType1 || allType2) {
                console.log(`   ⭐ Special 21-hour case: all courses same type, ${finalRemainingHours}h`);
                
                const finalCourses = toSchedule.filter(code => {
                  const course = courses[code];
                  if (!course || code === 'TR') return false;
                  
                  const prereqsMet = course.prerequisites.every(prereq => completed.includes(prereq));
                  if (!prereqsMet) return false;
                  
                  if (code === 'PC401' && currentHours < 85) return false;
                  
                  return true;
                });
                
                if (finalCourses.length > 0) {
                  const finalHours = calculateHours(finalCourses);
                  const nextTermNumber = currentTermNumber + 1;
                  const nextTermType = (nextTermNumber % 2 === 1) ? 1 : 2;
                  const nextTermYearIndex = Math.floor((nextTermNumber - 1) / 2);
                  const nextYear = term1BaseYear + nextTermYearIndex;
                  const nextTermName = nextTermType === 1 ? 'First' : 'Second';
                  
                  newSemesters.push({
                    name: `${nextTermName} Term ${nextYear}-${nextYear + 1}`,
                    courses: finalCourses,
                    hours: finalHours,
                    isSummer: false,
                    isSpecialCase: true
                  });
                  
                  completed.push(...finalCourses);
                  toSchedule = toSchedule.filter(code => !finalCourses.includes(code));
                  currentHours = calculateHours(completed);
                  
                  console.log(`   ✅ Added special 21-hour semester: ${finalCourses.length} courses`);
                }
              }
            }
            
            currentTermNumber++;
            if (currentTermNumber > 12) {
              console.log('⚠️ Reached maximum term (12)');
              break;
            }
          }
          
          console.log(`\nRe-planning complete: ${newSemesters.length} new semesters`);
          if (toSchedule.length > 0) {
            console.log(`⚠️ ${toSchedule.length} courses not scheduled: ${toSchedule.join(', ')}`);
          }
          
          return newSemesters;
        }

        // Add summer semester after a specific semester
        function addSummerSemesterAfter(afterIndex) {
          const plan = generatedPlans[currentPlanIndex];
          
          // Determine the year based on the semester after which we're adding
          const afterSemester = plan.semesters[afterIndex];
          let year = 2024;
          
          // Extract year from semester name if possible
          const yearMatch = afterSemester.name.match(/(\d{4})/);
          if (yearMatch) {
            year = parseInt(yearMatch[1]);
          }
          
          // Check if remaining hours qualify for special case
          const remainingCourses = Object.keys(courses).filter(code => {
            const selected = [...new Set(window.selected || [])];
            return !selected.includes(code) && code !== 'BMA001';
          });
          const remainingHours = remainingCourses.reduce((sum, code) => sum + (courses[code]?.hours || 0), 0);
          
          const isSpecialCase = (remainingHours > 0 && remainingHours <= 12);
          
          // Create summer semester
          const summerSemester = {
            name: `Summer Term ${year}-${year + 1}${isSpecialCase ? ' (Special Case)' : ''}`,
            courses: [],
            hours: 0,
            isSummer: true,
            isSpecialCase: isSpecialCase
          };

          // Insert after the specified index
          plan.semesters.splice(afterIndex + 1, 0, summerSemester);
          
          displayStudyPlan(currentPlanIndex);
          
          const maxHours = isSpecialCase ? 12 : 9;
          const message = isSpecialCase 
            ? `⭐ Summer special case added after ${afterSemester.name}! Drag theoretical courses here (max ${maxHours} hours - any semester 1-8).`
            : `Summer semester added after ${afterSemester.name}! Drag courses here (max ${maxHours} hours, theoretical only).`;
          
          TechBot.success(message);
        }

        // Delete semester
        function deleteSemester(semesterIndex) {
          const plan = generatedPlans[currentPlanIndex];
          const semester = plan.semesters[semesterIndex];
          
          if (!semester.isSummer) {
            TechBot.error('Cannot delete regular semesters, only summer semesters.');
            return;
          }

          const doDelete = function() {
            // Save state for undo
            UndoRedoManager.saveState(`Deleted ${semester.name}`);
            
            plan.semesters.splice(semesterIndex, 1);
            displayStudyPlan(currentPlanIndex);
            TechBot.success('Summer semester deleted.');
          };

          if (semester.courses.length > 0) {
            window.confirmDeleteSemester = doDelete;
            TechBot.confirm(
              '🗑️ Delete Summer Semester',
              `This summer semester has ${semester.courses.length} course(s). Delete anyway? Courses will be unscheduled.`,
              'confirmDeleteSemester'
            );
          } else {
            doDelete();
          }
        }

        // Toggle special case for a semester
        function toggleSpecialCase(semesterIndex) {
          const plan = generatedPlans[currentPlanIndex];
          if (!plan) return;
          
          const semester = plan.semesters[semesterIndex];
          UndoRedoManager.saveState(`${semester.isSpecialCase ? 'Removed' : 'Added'} special case on ${semester.name}`);
          
          semester.isSpecialCase = !semester.isSpecialCase;
          
          const isSummer = semester.isSummer;
          const maxH = semester.isSpecialCase
            ? (isSummer ? 12 : 21)
            : (isSummer ? 9 : 18);
          const prevMax = semester.isSpecialCase
            ? (isSummer ? 9 : 18)
            : (isSummer ? 12 : 21);
          
          if (semester.isSpecialCase) {
            TechBot.success(`⭐ "${semester.name}" is now a Special Case — max hours raised to ${maxH}h`);
          } else {
            // Check if current hours exceed the new (reduced) limit
            if (semester.hours > maxH) {
              TechBot.warning(`⚠️ Special case removed from "${semester.name}". Max hours is now ${maxH}h, but semester has ${semester.hours}h — please move some courses out.`);
            } else {
              TechBot.notify(`☆ Special case removed from "${semester.name}" — max is ${maxH}h again.`);
            }
          }
          
          displayStudyPlan(currentPlanIndex);
        }

        // Reset plan to original
        function resetPlan() {
          window.confirmResetPlan = function() {
            // Save state for undo
            UndoRedoManager.saveState('Reset plan to original');
            
            generateMultiplePlans();
            TechBot.success('Plan reset to original.');
          };
          
          TechBot.confirm(
            '🔄 Reset Plan',
            'Reset plan to original? All your changes will be lost.',
            'confirmResetPlan'
          );
        }

        // Show toast notification (replaces old inline validationMessage)
        function showValidation(message, type = 'info') {
          // Also update inline message for backward compat
          const msgDiv = document.getElementById('validationMessage');
          if (msgDiv) {
            msgDiv.className = `validation-message ${type}`;
            msgDiv.textContent = message;
            msgDiv.style.display = 'block';
            setTimeout(() => { msgDiv.style.display = 'none'; }, 5000);
          }

          // Toast
          let container = document.getElementById('toastContainer');
          if (!container) {
            container = document.createElement('div');
            container.id = 'toastContainer';
            document.body.appendChild(container);
          }
          const toast = document.createElement('div');
          toast.className = `toast-msg ${type}`;
          toast.textContent = message;
          container.appendChild(toast);
          setTimeout(() => {
            toast.style.opacity = '0';
            toast.style.transition = 'opacity 0.3s ease';
            setTimeout(() => toast.remove(), 350);
          }, 4500);
        }

        // ============================================================
        // REMOVE COURSE FROM PLAN (with cascade deletion of dependents)
        // ============================================================
        function removeCourseFromPlan(courseCode, semesterIndex) {
          const plan = generatedPlans[currentPlanIndex];
          if (!plan) return;

          // Find all courses in later semesters that depend on this one (cascade)
          function findDependents(code, fromSemIdx) {
            const deps = [];
            for (let i = fromSemIdx + 1; i < plan.semesters.length; i++) {
              plan.semesters[i].courses.forEach(c => {
                if (courses[c] && courses[c].prerequisites.includes(code)) {
                  deps.push({ code: c, semIdx: i });
                  // Recurse to find dependents of dependents
                  const nested = findDependents(c, i);
                  nested.forEach(n => {
                    if (!deps.find(d => d.code === n.code)) deps.push(n);
                  });
                }
              });
            }
            return deps;
          }

          const dependents = findDependents(courseCode, semesterIndex);

          // Build confirmation message
          let msg = `Remove <strong>"${courses[courseCode]?.name}"</strong>?`;
          if (dependents.length > 0) {
            const names = dependents.map(d => `<strong>${courses[d.code]?.name || d.code}</strong>`).join(', ');
            msg += `\n\nThis will also remove <strong>${dependents.length}</strong> dependent course(s):\n${names}`;
          }

          // Store the removal function
          window.confirmRemoveCourse = function() {
            // Save state for undo
            UndoRedoManager.saveState(`Removed ${courseCode} from ${plan.semesters[semesterIndex].name}`);
            
            // Remove course from its semester
            const sem = plan.semesters[semesterIndex];
            const idx = sem.courses.indexOf(courseCode);
            if (idx > -1) {
              sem.courses.splice(idx, 1);
              sem.hours -= (courses[courseCode]?.hours || 0);
            }

            // Remove cascaded dependents
            dependents.forEach(({ code: depCode, semIdx }) => {
              const depSem = plan.semesters[semIdx];
              const depIdx = depSem.courses.indexOf(depCode);
              if (depIdx > -1) {
                depSem.courses.splice(depIdx, 1);
                depSem.hours -= (courses[depCode]?.hours || 0);
              }
            });

            // Refresh display
            displayStudyPlan(currentPlanIndex);

            const msg2 = dependents.length > 0
              ? `Removed "${courses[courseCode]?.name}" and ${dependents.length} dependent(s): ${dependents.map(d=>courses[d.code]?.name||d.code).join(', ')}`
              : `Removed "${courses[courseCode]?.name}" from the plan`;
            TechBot.success(msg2);
          };

          // Show TechBot confirmation dialog
          TechBot.confirm(
            '🗑️ Remove Course',
            msg,
            'confirmRemoveCourse'
          );
        }

        // Generate optimized study plan
        function generateMultiplePlans() {
          addDebugLog('\n🎓 Generating optimized study plan...', 'info');
          
          // Try to detect current term from most recent PDF parse
          let detectedStartTerm = null;
          
          // Check if we have stored PDF course data
          if (window.lastParsedPdfCourses && window.lastParsedPdfCourses.length > 0) {
            const currentTerm = detectCurrentTerm(window.lastParsedPdfCourses);
            
            if (currentTerm.isDetected) {
              addDebugLog(`\n🔍 CURRENT TERM DETECTED: Term ${currentTerm.termNumber}`, 'info');
              addDebugLog(`   Currently registered: ${currentTerm.registeredCourses.length} courses`, 'info');
              
              // Validate current registration
              const uniqueSelected = [...new Set(selected)];
              const validation = validateCurrentRegistration(currentTerm, uniqueSelected);
              
              if (!validation.isValid) {
                addDebugLog(`\n⚠️ REGISTRATION VIOLATIONS DETECTED:`, 'warning');
                validation.violations.forEach(v => {
                  addDebugLog(`   ❌ ${v.code}: ${v.reason}`, 'error');
                });
              } else {
                addDebugLog(`   ✅ Current registration is valid`, 'success');
              }
              
              detectedStartTerm = currentTerm.termNumber;
            }
          }
          
          // Use detected term or fallback to term 1
          let finalStartTerm = detectedStartTerm || 1;
          
          // Ensure we start from at least term 1
          if (finalStartTerm < 1) finalStartTerm = 1;
          
          addDebugLog(`\n📅 Starting plan from Term ${finalStartTerm}`, 'info');
          
          generatedPlans = [];
          
          // Generate single OPTIMIZED plan with all requirements:
          // 1. Prioritizes courses that unlock the most other courses
          // 2. Smart dependency management
          // 3. Projects (PC401, PC402) get highest priority when eligible
          // 4. Fills semesters to maximum hours (18 or 21 at special cases)
          // 5. Aims for fastest graduation
          // 6. Automatically adds Summer term with TR when 60 hours gained
          const optimizedPlan = generateStudyPlan('optimized', finalStartTerm);

          // Compute and store term1BaseYear so replanAfterMove can use
          // the correct year offset instead of the hardcoded 2024 fallback.
          const _now = new Date();
          const _curAcYear = (_now.getMonth() + 1 >= 9) ? _now.getFullYear() : _now.getFullYear() - 1;
          const _t1BaseYear = _curAcYear - Math.floor((finalStartTerm - 1) / 2);

          generatedPlans.push({
            name: 'Optimized Study Plan',
            semesters: optimizedPlan,
            strategy: 'optimized',
            term1BaseYear: _t1BaseYear
          });

          addDebugLog(`✅ Generated optimized study plan with ${optimizedPlan.length} semesters`, 'success');

          // Display plan selector (even though there's only one plan)
          const selectorDiv = document.getElementById('planSelectorDiv');
          const selector = document.getElementById('planSelector');
          selector.innerHTML = '';

          generatedPlans.forEach((plan, index) => {
            const btn = document.createElement('button');
            btn.className = `plan-option ${index === 0 ? 'active' : ''}`;
            btn.textContent = plan.name;
            btn.onclick = () => {
              document.querySelectorAll('.plan-option').forEach(b => b.classList.remove('active'));
              btn.classList.add('active');
              currentPlanIndex = index;
              displayStudyPlan(index);
            };
            selector.appendChild(btn);
          });

          selectorDiv.style.display = 'block';
          window._planJustGenerated = true; // Flag set before display so scroll fires once
          displayStudyPlan(0);
        }

        // Handle generate plan button
        document.getElementById('generatePlanBtn').addEventListener('click', function() {
          if (selected.length === 0) {
            alert('Please upload a student transcript first!');
            return;
          }

          generateMultiplePlans();
          // Note: draggability on .course cells is already set by addCourse().
          // No need to re-register listeners here; that would create duplicates.
        });

        // Handle file upload
        document.getElementById('pdfInput').addEventListener('change', async function(e) {
          const file = e.target.files[0];
          if (!file) {
            console.log('No file selected');
            return;
          }

          console.log('File selected:', file.name, file.type, file.size);
          
          // ===== FILE VALIDATION =====
          const maxSize = 10 * 1024 * 1024; // 10MB limit
          if (file.size > maxSize) {
            alert(`File too large! Maximum size is 10MB. Your file is ${(file.size / 1024 / 1024).toFixed(2)}MB`);
            addDebugLog(`❌ File too large: ${(file.size / 1024 / 1024).toFixed(2)}MB (max 10MB)`, 'error');
            return;
          }
          
          debugLog = []; // Clear debug log
          addDebugLog(`🚀 Starting to process: ${file.name} (${(file.size / 1024).toFixed(2)}KB)`, 'info');

          let result;
          
          // Check file type
          if (file.name.endsWith('.pdf') || file.type === 'application/pdf') {
            addDebugLog('📄 Detected PDF file', 'info');
            result = await parsePDF(file);
          } else if (file.name.endsWith('.xlsx') || file.name.endsWith('.xls') || 
                     file.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' ||
                     file.type === 'application/vnd.ms-excel') {
            addDebugLog('📊 Detected Excel file', 'info');
            result = await parseExcel(file);
          } else {
            addDebugLog(`❌ Unsupported file type: ${file.type}. Please upload PDF or Excel file.`, 'error');
            alert('Please upload a PDF or Excel file');
            return;
          }

          if (!result) {
            addDebugLog('❌ Failed to parse file', 'error');
            return;
          }

          const { courses: pdfCourses, studentInfo } = result;

          if (!pdfCourses || pdfCourses.length === 0) {
            addDebugLog('⚠️ No courses found in the file', 'warning');
            alert('No courses found in the uploaded file. Please check the file format.');
            return;
          }

          // Store PDF courses for term detection
          window.lastParsedPdfCourses = pdfCourses;
          addDebugLog(`💾 Stored ${pdfCourses.length} course records for analysis`, 'info');

          // Display student info
          if (studentInfo.name) {
            document.getElementById('studentInfo').style.display = 'block';
            document.getElementById('studentName').textContent = `👤 Name: ${studentInfo.name}`;
            document.getElementById('studentId').textContent = `🆔 ID: ${studentInfo.id || 'N/A'}`;
            document.getElementById('studentLevel').textContent = `📚 Level: ${studentInfo.level || 'N/A'}`;
            
            if (studentInfo.gpa) {
              document.getElementById('gpaValue').textContent = studentInfo.gpa;
              const gpaNum = parseFloat(studentInfo.gpa);
              document.getElementById('gpaGrade').textContent = 
                gpaNum >= 3.7 ? 'Excellent' : 
                gpaNum >= 3.0 ? 'Very Good' : 
                gpaNum >= 2.5 ? 'Good' : 'Pass';
            }
          }

          // Auto-select courses
          const stats = autoSelectCourses(pdfCourses);
          
          // ===== CRITICAL SAFEGUARD: Remove any duplicates from selected array =====
          const beforeDedup = selected.length;
          selected = [...new Set(selected)];  // Convert to Set and back to remove duplicates
          const afterDedup = selected.length;
          
          if (beforeDedup !== afterDedup) {
            addDebugLog(`⚠️ WARNING: Removed ${beforeDedup - afterDedup} duplicate entries from selected courses!`, 'error');
            addDebugLog(`   Before: ${beforeDedup} courses, After: ${afterDedup} courses`, 'warning');
          } else {
            addDebugLog(`✅ No duplicates found in selected courses (${afterDedup} unique courses)`, 'success');
          }
          
          // Sanity check: A typical 4th year student should have ~25-30 courses completed
          if (afterDedup > 40) {
            addDebugLog(`⚠️⚠️ SANITY CHECK FAILED: ${afterDedup} courses seems too high!`, 'error');
            addDebugLog(`   💡 This might indicate duplicate matching or program mismatch`, 'error');
            addDebugLog(`   💡 Check if you selected the correct program (IT vs AI) at the top of the page`, 'warning');
          } else if (afterDedup < 10) {
            addDebugLog(`⚠️ SANITY CHECK: Only ${afterDedup} courses matched`, 'warning');
            addDebugLog(`   💡 This might indicate matching issues - check the debug log for unmatched courses`, 'warning');
          } else {
            addDebugLog(`✅ Sanity check passed: ${afterDedup} courses is reasonable for year 4`, 'success');
          }
          
          // Verify no failing courses were selected
          addDebugLog(`\n🔍 VERIFICATION: Checking selected courses...`, 'info');
          const uniqueSelected = [...new Set(selected)];
          addDebugLog(`   Total selected: ${uniqueSelected.length} unique courses`, 'info');
          
          // Check if IT438 was selected (for debugging)
          if (uniqueSelected.includes('IT438')) {
            addDebugLog(`   ⚠️ WARNING: IT438 (Communication Technology) was selected - this might be an error!`, 'error');
          } else {
            addDebugLog(`   ✅ IT438 (Communication Technology) NOT selected`, 'success');
          }
          
          // Show statistics
          document.getElementById('statsContainer').style.display = 'grid';
          calculateStatistics();

          // Show remaining courses
          document.getElementById('remainingCourses').style.display = 'block';
          showRemainingCourses();

          // Show study plan generator
          document.getElementById('studyPlanContainer').style.display = 'block';

          addDebugLog(`✨ Processing complete!`, 'success');
          
          // Trigger auto-scroll sequence
          autoScrollAfterUpload();
        });

        // Make upload box clickable
        document.getElementById('uploadBox').addEventListener('click', function() {
          document.getElementById('pdfInput').click();
        });

        // Prevent default drag and drop behavior
        document.getElementById('uploadBox').addEventListener('dragover', function(e) {
          e.preventDefault();
          e.stopPropagation();
          this.style.borderColor = '#2563eb';
          this.style.background = '#eff6ff';
        });

        document.getElementById('uploadBox').addEventListener('dragleave', function(e) {
          e.preventDefault();
          e.stopPropagation();
          this.style.borderColor = '#3b82f6';
          this.style.background = 'white';
        });

        document.getElementById('uploadBox').addEventListener('drop', function(e) {
          e.preventDefault();
          e.stopPropagation();
          this.style.borderColor = '#3b82f6';
          this.style.background = 'white';
          
          const files = e.dataTransfer.files;
          if (files.length > 0) {
            document.getElementById('pdfInput').files = files;
            document.getElementById('pdfInput').dispatchEvent(new Event('change'));
          }
        });

        // Parse Excel file
        async function parseExcel(file) {
          try {
            addDebugLog('📊 Loading Excel file...', 'info');
            const arrayBuffer = await file.arrayBuffer();
            const workbook = XLSX.read(arrayBuffer, { type: 'array' });
            const firstSheet = workbook.Sheets[workbook.SheetNames[0]];
            const data = XLSX.utils.sheet_to_json(firstSheet, { header: 1 });
            
            // Convert to text format similar to PDF
            let text = '';
            data.forEach(row => {
              text += row.join(' ') + '\n';
            });

            addDebugLog('✅ Excel loaded successfully', 'success');
            return extractCoursesFromText(text);
          } catch (error) {
            addDebugLog(`❌ Error parsing Excel: ${error.message}`, 'error');
            return null;
          }
        }
      });
    


    // ============================================================
    // TECHBOT NOTIFICATION SYSTEM
    // ============================================================
    
    const TechBot = {
      prefixes: ['Processing...', 'System update:', 'Optimization complete:', 'Analysis:', 'Computing...', 'Executing...'],
      
      // Show toast notification (bottom right)
      notify(message, duration = 4000) {
        const toast = document.getElementById('techbot-toast');
        const textEl = document.getElementById('toast-text');
        
        // Random prefix
        const prefix = this.prefixes[Math.floor(Math.random() * this.prefixes.length)];
        textEl.innerHTML = `${prefix} ${message}`;
        
        toast.classList.add('show');
        
        setTimeout(() => {
          toast.classList.remove('show');
        }, duration);
      },
      
      // Show modal dialog
      showModal(title, message, buttons = null) {
        const modal = document.getElementById('techbot-modal');
        const titleEl = document.getElementById('modal-title');
        const textEl = document.getElementById('modal-text');
        const buttonsEl = document.getElementById('modal-buttons');
        
        titleEl.textContent = title || '🤖 Assistant Bot Says';
        textEl.innerHTML = message;
        
        // Custom buttons or default
        if (buttons) {
          buttonsEl.innerHTML = buttons;
        } else {
          buttonsEl.innerHTML = '<button class="modal-btn modal-btn-primary" onclick="closeTechBotModal()">Got it!</button>';
        }
        
        modal.classList.add('show');
      },
      
      // Confirm dialog
      confirm(title, message, onConfirm, onCancel) {
        const buttons = `
          <button class="modal-btn modal-btn-secondary" onclick="closeTechBotModal(); ${onCancel ? onCancel + '()' : ''}">Cancel</button>
          <button class="modal-btn modal-btn-primary" onclick="closeTechBotModal(); ${onConfirm}()">Confirm</button>
        `;
        this.showModal(title, message, buttons);
      },
      
      // Success message
      success(message) {
        this.notify(message);
      },
      
      // Error message
      error(message) {
        this.showModal('⚠️ System Alert', message);
      },
      
      // Warning message
      warning(message) {
        this.notify(message, 5000);
      }
    };
    
    function closeTechBotModal() {
      document.getElementById('techbot-modal').classList.remove('show');
    }
    
    // Close modal on outside click
    document.addEventListener('click', (e) => {
      const modal = document.getElementById('techbot-modal');
      if (e.target === modal) {
        closeTechBotModal();
      }
    });

    // ============================================================
    // UNDO/REDO SYSTEM
    // ============================================================
    
    const UndoRedoManager = {
      undoStack: [],
      redoStack: [],
      maxStackSize: 50,
      
      saveState(description) {
        const state = {
          description: description,
          studyPlanHTML: document.getElementById('studyPlanDisplay')?.innerHTML || '',
          courseListHTML: document.getElementById('courseList')?.innerHTML || '',
          timestamp: Date.now()
        };
        
        this.undoStack.push(state);
        if (this.undoStack.length > this.maxStackSize) {
          this.undoStack.shift();
        }
        
        // Clear redo stack on new action
        this.redoStack = [];
        
        console.log('State saved:', description);
      },
      
      undo() {
        if (this.undoStack.length === 0) {
          TechBot.notify('No actions to undo');
          return;
        }
        
        // Save current state to redo stack
        const currentState = {
          studyPlanHTML: document.getElementById('studyPlanDisplay')?.innerHTML || '',
          courseListHTML: document.getElementById('courseList')?.innerHTML || '',
          timestamp: Date.now()
        };
        this.redoStack.push(currentState);
        
        // Restore previous state
        const previousState = this.undoStack.pop();
        document.getElementById('studyPlanDisplay').innerHTML = previousState.studyPlanHTML;
        document.getElementById('courseList').innerHTML = previousState.courseListHTML;
        
        // Reinitialize drag and drop
        if (window.initializeDragAndDrop) {
          window.initializeDragAndDrop();
        }
        
        TechBot.notify(`Undone: ${previousState.description}`);
      },
      
      redo() {
        if (this.redoStack.length === 0) {
          TechBot.notify('No actions to redo');
          return;
        }
        
        // Save current state to undo stack
        const currentState = {
          studyPlanHTML: document.getElementById('studyPlanDisplay')?.innerHTML || '',
          courseListHTML: document.getElementById('courseList')?.innerHTML || '',
          timestamp: Date.now()
        };
        this.undoStack.push(currentState);
        
        // Restore next state
        const nextState = this.redoStack.pop();
        document.getElementById('studyPlanDisplay').innerHTML = nextState.studyPlanHTML;
        document.getElementById('courseList').innerHTML = nextState.courseListHTML;
        
        // Reinitialize drag and drop
        if (window.initializeDragAndDrop) {
          window.initializeDragAndDrop();
        }
        
        TechBot.notify('Action redone');
      }
    };
    
    // Keyboard shortcuts for undo/redo
    document.addEventListener('keydown', (e) => {
      // Ctrl+Z or Cmd+Z for undo
      if ((e.ctrlKey || e.metaKey) && e.key === 'z' && !e.shiftKey) {
        e.preventDefault();
        UndoRedoManager.undo();
      }
      
      // Ctrl+Y or Cmd+Y for redo
      if ((e.ctrlKey || e.metaKey) && e.key === 'y') {
        e.preventDefault();
        UndoRedoManager.redo();
      }
      
      // Ctrl+Shift+Z for redo (alternative)
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'z') {
        e.preventDefault();
        UndoRedoManager.redo();
      }
    });

    // ============================================================
    // COURSE CONSTRAINTS VALIDATION
    // ============================================================
    
    const CourseConstraints = {
      // Check if course can be added to a semester
      canAddCourse(courseName, semesterType, semesterNumber, completedCredits, completedCourses) {
        const normalizedName = courseName.trim();
        
        // Summer Training constraints
        if (normalizedName.includes('Summer Training') || normalizedName.includes('التدريب الصيفي')) {
          if (semesterType !== 'Summer') {
            return {
              allowed: false,
              reason: 'Summer Training can only be added to summer semesters.'
            };
          }
          if (completedCredits < 60) {
            return {
              allowed: false,
              reason: `Summer Training requires at least 60 credit hours. You currently have ${completedCredits} hours.`
            };
          }
        }
        
        // Project 1 constraints
        if (normalizedName.includes('Project 1') || normalizedName.includes('مشروع 1')) {
          if (semesterType === 'Even') {
            return {
              allowed: false,
              reason: 'Project 1 can only be taken in odd semesters (Fall).'
            };
          }
          if (semesterType === 'Summer') {
            return {
              allowed: false,
              reason: 'Project 1 cannot be taken in summer semesters.'
            };
          }
          if (completedCredits < 85) {
            return {
              allowed: false,
              reason: `Project 1 requires at least 85 credit hours. You currently have ${completedCredits} hours.`
            };
          }
        }
        
        // Project 2 constraints
        if (normalizedName.includes('Project 2') || normalizedName.includes('مشروع 2')) {
          if (semesterType === 'Odd') {
            return {
              allowed: false,
              reason: 'Project 2 can only be taken in even semesters (Spring).'
            };
          }
          if (semesterType === 'Summer') {
            return {
              allowed: false,
              reason: 'Project 2 cannot be taken in summer semesters.'
            };
          }
          
          // Check if Project 1 is completed
          const hasProject1 = completedCourses.some(course => 
            course.includes('Project 1') || course.includes('مشروع 1')
          );
          
          if (!hasProject1) {
            return {
              allowed: false,
              reason: 'Project 2 requires completion of Project 1 first.'
            };
          }
        }
        
        return { allowed: true };
      },
      
      // Calculate completed credits from semesters before current
      calculateCompletedCredits(allSemesters, currentSemesterIndex) {
        let credits = 0;
        for (let i = 0; i < currentSemesterIndex; i++) {
          const semester = allSemesters[i];
          const courses = semester.querySelectorAll('.semester-course-item');
          courses.forEach(course => {
            const creditMatch = course.textContent.match(/\((\d+)\s*(?:ساعة|hours?)\)/i);
            if (creditMatch) {
              credits += parseInt(creditMatch[1]);
            }
          });
        }
        return credits;
      },
      
      // Get completed courses from previous semesters
      getCompletedCourses(allSemesters, currentSemesterIndex) {
        const courses = [];
        for (let i = 0; i < currentSemesterIndex; i++) {
          const semester = allSemesters[i];
          const courseElements = semester.querySelectorAll('.semester-course-item');
          courseElements.forEach(el => {
            courses.push(el.textContent.trim());
          });
        }
        return courses;
      }
    };

    // ============================================================
    // EXPORT STUDY PLAN AS PDF (using html2pdf.js)
    // ============================================================
    function exportStudyPlanAsPDF() {
      const planDisplay = document.getElementById('studyPlanDisplay');
      const studentInfoEl = document.getElementById('studentInfo');
      
      if (!planDisplay || planDisplay.innerHTML.trim() === '') {
        TechBot.error('Please generate a study plan first before exporting!');
        return;
      }
      
      TechBot.notify('Initializing PDF export sequence...');
      
      // Gather student information
      const studentName = studentInfo?.name || document.getElementById('studentName')?.textContent?.replace('👤 Name: ', '') || 'Student Name';
      const studentId = studentInfo?.id || document.getElementById('studentId')?.textContent?.replace('🆔 ID: ', '') || 'N/A';
      const studentCenter = studentInfo?.level || 'Computer Science Program';
      const studentGPA = studentInfo?.gpa || '0.00';
      const completedHours = selected.reduce((sum, code) => sum + (courses[code]?.hours || 0), 0);
      
      // Build print-friendly container
      const printWrapper = document.createElement('div');
      printWrapper.id = 'pdf-export-wrapper';
      printWrapper.style.cssText = 'font-family: Arial, sans-serif; padding: 20px; color: #000; background: white; width: 794px; min-height: 500px;';
      
      // Build HTML content matching Excel structure
      let html = `
        <div style="border-bottom: 3px solid #2563eb; padding-bottom: 12px; margin-bottom: 20px;">
          <h1 style="margin: 0; font-size: 24px; color: #1e3a8a;">🎓 Study Plan</h1>
          <p style="margin: 5px 0 0; font-size: 12px; color: #64748b;">
            Generated on ${new Date().toLocaleDateString('en-US', {year:'numeric', month:'long', day:'numeric'})}
          </p>
        </div>
        
        <div style="background: #f0f9ff; border: 1px solid #bae6fd; border-radius: 8px; padding: 15px; margin-bottom: 20px;">
          <table style="width: 100%; font-size: 13px;">
            <tr>
              <td style="padding: 4px 0; font-weight: 600; width: 150px;">Name:</td>
              <td style="padding: 4px 0;">${studentName}</td>
            </tr>
            <tr>
              <td style="padding: 4px 0; font-weight: 600;">ID:</td>
              <td style="padding: 4px 0;">${studentId}</td>
            </tr>
            <tr>
              <td style="padding: 4px 0; font-weight: 600;">Center:</td>
              <td style="padding: 4px 0;">${studentCenter}</td>
            </tr>
            <tr>
              <td style="padding: 4px 0; font-weight: 600;">Gained Hours:</td>
              <td style="padding: 4px 0;">${completedHours}</td>
            </tr>
            <tr>
              <td style="padding: 4px 0; font-weight: 600;">GPA:</td>
              <td style="padding: 4px 0;">${studentGPA}</td>
            </tr>
          </table>
        </div>
        
        <div style="margin-bottom: 25px;">
          <h3 style="margin: 0 0 10px; font-size: 16px; color: #1e3a8a; border-bottom: 2px solid #e5e7eb; padding-bottom: 6px;">
            All Passed Till Now
          </h3>
          <table style="width: 100%; font-size: 12px; border-collapse: collapse;">
      `;
      
      // Add completed courses
      let completedTotal = 0;
      let hasMath0 = false;
      selected.forEach((code, index) => {
        const course = courses[code];
        if (course) {
          const bg = index % 2 === 0 ? '#f8fafc' : '#ffffff';
          html += `
            <tr style="background: ${bg};">
              <td style="padding: 6px 8px; border-bottom: 1px solid #e5e7eb;">${course.name}</td>
              <td style="padding: 6px 8px; border-bottom: 1px solid #e5e7eb; text-align: right; width: 80px;">${course.hours} hours</td>
            </tr>
          `;
          if (course.name.includes('Mathematics - 0') || course.name.includes('Mathematics-0')) {
            hasMath0 = true;
          } else {
            completedTotal += course.hours;
          }
        }
      });
      
      // If Math-0 wasn't excluded, add all hours
      if (!hasMath0) {
        completedTotal = selected.reduce((sum, code) => sum + (courses[code]?.hours || 0), 0);
      }
      
      html += `
            <tr style="background: #dbeafe; font-weight: 600;">
              <td style="padding: 8px; border-top: 2px solid #3b82f6;">Total Hours</td>
              <td style="padding: 8px; text-align: right; border-top: 2px solid #3b82f6;">${completedTotal} hours</td>
            </tr>
          </table>
        </div>
      `;
      
      // Add planned semesters from the study plan display
      const semesterCards = planDisplay.querySelectorAll('.semester-card');
      let grandTotal = completedTotal;
      
      semesterCards.forEach((card, semIndex) => {
        const titleEl = card.querySelector('.semester-title, h3');
        const semesterTitle = titleEl ? titleEl.textContent.trim() : `Semester ${semIndex + 1}`;
        
        html += `
          <div style="margin-bottom: 25px; page-break-inside: avoid;">
            <h3 style="margin: 0 0 10px; font-size: 16px; color: #1e3a8a; border-bottom: 2px solid #e5e7eb; padding-bottom: 6px;">
              ${semesterTitle}
            </h3>
            <table style="width: 100%; font-size: 12px; border-collapse: collapse;">
        `;
        
        const courseItems = card.querySelectorAll('.semester-course-item');
        let semesterTotal = 0;
        
        courseItems.forEach((item, courseIndex) => {
          const courseText = item.textContent.trim();
          const hoursMatch = courseText.match(/\((\d+)\s*(?:hours?|ساعة|ساعات)\)/i);
          const hours = hoursMatch ? parseInt(hoursMatch[1]) : 3;
          const courseName = courseText.replace(/\(\d+\s*(?:hours?|ساعة|ساعات)\)/gi, '').trim();
          
          const bg = courseIndex % 2 === 0 ? '#f8fafc' : '#ffffff';
          html += `
            <tr style="background: ${bg};">
              <td style="padding: 6px 8px; border-bottom: 1px solid #e5e7eb;">${courseName}</td>
              <td style="padding: 6px 8px; border-bottom: 1px solid #e5e7eb; text-align: right; width: 80px;">${hours} hours</td>
            </tr>
          `;
          semesterTotal += hours;
        });
        
        html += `
              <tr style="background: #dbeafe; font-weight: 600;">
                <td style="padding: 8px; border-top: 2px solid #3b82f6;">Total Hours</td>
                <td style="padding: 8px; text-align: right; border-top: 2px solid #3b82f6;">${semesterTotal} hours</td>
              </tr>
            </table>
          </div>
        `;
        
        grandTotal += semesterTotal;
      });
      
      // Grand total
      html += `
        <div style="background: linear-gradient(135deg, #eff6ff, #dbeafe); border: 2px solid #3b82f6; border-radius: 8px; padding: 15px; margin-top: 20px;">
          <table style="width: 100%; font-size: 15px; font-weight: 700; color: #1e3a8a;">
            <tr>
              <td>Grand Total Hours</td>
              <td style="text-align: right;">${grandTotal} hours</td>
            </tr>
          </table>
        </div>
      `;
      
      printWrapper.innerHTML = html;
      
      // Show loading state
      const fabBtn = document.getElementById('fabExportPdf');
      const origText = fabBtn.innerHTML;
      fabBtn.innerHTML = '⏳ Generating PDF...';
      fabBtn.disabled = true;
      
      // Add to document - positioned off-screen so html2canvas can render it
      document.body.appendChild(printWrapper);
      printWrapper.style.position = 'absolute';
      printWrapper.style.left = '-9999px';
      printWrapper.style.top = '0';
      printWrapper.style.zIndex = '-1';
      printWrapper.style.pointerEvents = 'none';
      
      // PDF options
      const opt = {
        margin: [10, 10, 10, 10],
        filename: `Study_Plan_${studentId}.pdf`,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { 
          scale: 2, 
          useCORS: true, 
          letterRendering: true,
          logging: false,
          backgroundColor: '#ffffff',
          scrollX: 0,
          scrollY: 0,
          windowWidth: 794,
          onclone: function(clonedDoc) {
            const wrapper = clonedDoc.getElementById('pdf-export-wrapper');
            if (wrapper) {
              wrapper.style.position = 'relative';
              wrapper.style.left = '0';
              wrapper.style.top = '0';
              wrapper.style.opacity = '1';
              wrapper.style.visibility = 'visible';
            }
          }
        },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
      };
      
      // Generate PDF
      setTimeout(() => {
        html2pdf().set(opt).from(printWrapper).save().then(() => {
          document.body.removeChild(printWrapper);
          fabBtn.innerHTML = '✅ PDF Saved!';
          TechBot.success('PDF exported successfully! Download should start automatically.');
          setTimeout(() => {
            fabBtn.innerHTML = origText;
            fabBtn.disabled = false;
          }, 2500);
        }).catch(err => {
          console.error('PDF error:', err);
          if (document.body.contains(printWrapper)) {
            document.body.removeChild(printWrapper);
          }
          fabBtn.innerHTML = origText;
          fabBtn.disabled = false;
          TechBot.error('PDF generation failed. Please try again or use browser print (Ctrl+P).');
        });
      }, 100);
    }

    // ============================================================
    // GRADUATION PROGRESS RING (updates whenever stats update)
    // ============================================================
    function updateProgressRing(percent) {
      const ring = document.getElementById('progressRing');
      const ringText = document.getElementById('progressRingText');
      if (!ring) return;
      
      const radius = 36;
      const circumference = 2 * Math.PI * radius;
      const offset = circumference - (percent / 100) * circumference;
      ring.style.strokeDasharray = circumference;
      ring.style.strokeDashoffset = offset;
      if (ringText) ringText.textContent = Math.round(percent) + '%';
    }

    // Patch calculateStatistics to also update ring
    const _origCalcStats = window.calculateStatistics;
    // We'll override after DOM is ready via MutationObserver on creditPercentage
    const ringObserver = new MutationObserver(function() {
      const pctEl = document.getElementById('creditPercentage');
      if (pctEl) {
        const match = pctEl.textContent.match(/([\d.]+)%/);
        if (match) updateProgressRing(parseFloat(match[1]));
      }
    });
    document.addEventListener('DOMContentLoaded', function() {
      const pctEl = document.getElementById('creditPercentage');
      if (pctEl) ringObserver.observe(pctEl, { childList: true, characterData: true, subtree: true });
    });
  
