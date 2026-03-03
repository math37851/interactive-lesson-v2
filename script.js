import { initializeApp } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-app.js";
import { getDatabase, ref, set, onValue } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-database.js";

// !ضع رابط قاعدة بيانات Firebase الخاصة بك هنا!
export const firebaseConfig = {
    databaseURL: "https://interactive-lesson-de2d9-default-rtdb.firebaseio.com/"
};

let app, db;
export let useFirebase = false;

if (firebaseConfig.databaseURL && !firebaseConfig.databaseURL.includes("REPLACE_WITH")) {
    try {
        app = initializeApp(firebaseConfig);
        db = getDatabase(app);
        useFirebase = true;

        // استماع للتحديثات الحية من جميع الطلاب عبر الإنترنت
        const studentsRef = ref(db, 'students');
        onValue(studentsRef, (snapshot) => {
            const data = snapshot.val();
            if (data) {
                // حفظ نسخة محلية لكي يقوم الكود الأصلي برسم المتصدرين
                localStorage.setItem('math_lesson_students', JSON.stringify(data));
                if (typeof updateLiveLeaderboard === 'function') {
                    updateLiveLeaderboard();
                }
            }
        });
    } catch (e) {
        console.warn("تنبيه: فشل الاتصال بقاعدة البيانات السحابية. سيتم استخدام التخزين المحلي.", e);
    }
}

// قاعدة بيانات الأسئلة والمستويات
const levelsData = [
    {
        level: 1,
        title: "المستوى الأول: الانطلاق",
        questions: [
            {
                skill: "حل معادلة بخطوتين",
                tutorial: {
                    title: "شرح قبل البدء: حل معادلة بخطوتين",
                    equation: "$$2x + 4 = 10$$",
                    steps: [
                        { text: "أولاً: نتخلص من الثابت المجموع أو المطروح بعكس العملية.", math: "$$2x = 6$$" },
                        { text: "ثانياً: نقسم على معامل x للحصول على المتغير بمفرده.", math: "$$x = 3$$" }
                    ]
                },
                equation: "$$3x + 5 = 17$$",
                steps: [
                    { skill: "التخلص من الجمع والطرح المباشر", expected: "3x = 12", options: ["3x = 22", "3x = 12", "x = 12", "3x = -12"], userInstruction: "اطرح 5 من الطرفين", hint: "تخلص من +5 بعكس العملية (الطرح) من الطرفين", success: "ممتاز! تخلصنا من الجمع." },
                    { skill: "القسمة على رقم موجب", expected: "x = 4", options: ["x = 4", "x = -4", "x = 6", "x = 3"], userInstruction: "اقسم الطرفين على معامل x", hint: "تخلص من الرقم 3 المضروب في x بالقسمة عليه", success: "رائع! لقد أوجدت قيمة x." }
                ],
                backup: {
                    equation: "$$4x - 2 = 14$$",
                    steps: [
                        { skill: "التخلص من الجمع والطرح المباشر", expected: "4x = 16", options: ["4x = 12", "4x = 16", "4x = -16", "x = 16"], userInstruction: "سؤال تدريبي: اجمع 2 للطرفين", hint: "تخلص من -2 بعكس العملية (الجمع)", success: "ممتاز! خطوة صحيحة." },
                        { skill: "القسمة على رقم موجب", expected: "x = 4", options: ["x = 4", "x = 12", "x = -4", "x = 8"], userInstruction: "اقسم الطرفين على معامل x", hint: "اقسم الطرفين على 4", success: "أحسنت!" }
                    ]
                }
            },
            {
                skill: "تجميع المتغيرات والثوابت",
                tutorial: {
                    title: "شرح قبل البدء: متغير مطروح منه عدد",
                    equation: "$$4x - 5 = 15$$",
                    steps: [
                        { text: "أولاً: ننقل الثابت السالب للطرف الآخر بعكس الإشارة (بالجمع).", math: "$$4x = 20$$" },
                        { text: "ثانياً: نقسم على معامل x.", math: "$$x = 5$$" }
                    ]
                },
                equation: "$$5x - 7 = 18$$",
                steps: [
                    { skill: "تجميع المتغيرات والثوابت", expected: "5x = 25", options: ["5x = 11", "5x = 25", "x = 25", "5x = -25"], userInstruction: "انقل الثابت للطرف الآخر", hint: "تخلص من -7 بجمع 7 للطرفين", success: "صحيح! الخطوة الأولى تمت بنجاح." },
                    { skill: "القسمة على رقم موجب", expected: "x = 5", options: ["x = 5", "x = 20", "x = -5", "x = 4"], userInstruction: "أوجد قيمة x بالمواظبة على القسمة", hint: "اقسم 25 على 5", success: "أحسنت! الإجابة صحيحة." }
                ],
                backup: {
                    equation: "$$2x - 9 = 11$$",
                    steps: [
                        { skill: "تجميع المتغيرات والثوابت", expected: "2x = 20", options: ["2x = 2", "2x = 20", "x = 20", "2x = -20"], userInstruction: "سؤال تدريبي: اجمع 9 للطرفين", hint: "تخلص من -9 بجمع 9 للطرفين", success: "ممتاز!" },
                        { skill: "القسمة على رقم موجب", expected: "x = 10", options: ["x = 10", "x = 9", "x = 11", "x = -10"], userInstruction: "أوجد قيمة x", hint: "اقسم الطرفين على 2", success: "صحيح!" }
                    ]
                }
            },
            {
                skill: "التعامل مع الأرقام الكبيرة",
                tutorial: {
                    title: "شرح قبل البدء: أرقام أكبر قليلاً",
                    equation: "$$6x + 4 = 40$$",
                    steps: [
                        { text: "طالما أنك فهمت الخطوات، فالأرقام الكبيرة لا تغير القاعدة. اطرح 4.", math: "$$6x = 36$$" },
                        { text: "ثم اقسم على 6.", math: "$$x = 6$$" }
                    ]
                },
                equation: "$$4x + 12 = 52$$",
                steps: [
                    { skill: "الجمع والطرح الذهني مع أرقام كبيرة", expected: "4x = 40", options: ["4x = 64", "4x = 40", "x = 40", "4x = -40"], userInstruction: "اطرح 12 من الطرفين", hint: "تخلص من +12 بالطرح", success: "رائع!" },
                    { skill: "قسمة أرقام كبيرة", expected: "x = 10", options: ["x = 10", "x = 12", "x = 8", "x = 40"], userInstruction: "أوجد قيمة المعادلة", hint: "اقسم الطرفين على 4", success: "تمام!" }
                ]
            },
            {
                skill: "حل متباينات بسيطة",
                tutorial: {
                    title: "شرح قبل البدء: المتباينات البسيطة",
                    equation: "$$x - 4 \\ge 6$$",
                    steps: [
                        { text: "المتباينة تُحل تماماً مثل المعادلة (إذا لم نقسم على سالب).", text: "" },
                        { text: "اجمع 4 للطرفين مع ترك الرمز كما هو.", math: "$$x \\ge 10$$" },
                        { text: "التمثيل على خط الأعداد: دائرة مغلقة عند 10، وسهم لليمين.", mathSVG: "NL_ge_10" }
                    ]
                },
                equation: "$$x - 8 \\ge 3$$",
                steps: [
                    { skill: "حل متباينة خطوة واحدة", expected: "x >= 11", options: ["x <= 11", "x >= 5", "x > 11", "x >= 11"], userInstruction: "حل المتباينة كأنها معادلة", hint: "اجمع 8 للطرفين مع الحفاظ على علامة التباين كما هي", success: "عمل رائع! المتباينة الأولى صحيحة." },
                    { skill: "تمثيل المتباينة على خط الأعداد", expected: "NL_ge_11", options: ["NL_ge_11", "NL_le_11", "NL_gt_11", "NL_lt_11"], userInstruction: "مثل الحل على خط الأعداد", hint: "العلامة ≥ تعني أن الدائرة مغلقة والاتجاه يمين نحو القيم الأكبر", success: "تمثيل صحيح لخط الأعداد!" }
                ],
                backup: {
                    equation: "$$x - 5 \\ge 4$$",
                    steps: [
                        { skill: "حل متباينة خطوة واحدة", expected: "x >= 9", options: ["x <= 9", "x >= -1", "x > 9", "x >= 9"], userInstruction: "سؤال تدريبي: اجمع 5 للطرفين", hint: "اجمع 5 للطرفين دون تغيير الإشارة", success: "أحسنت، فهمت القاعدة!" },
                        { skill: "تمثيل المتباينة على خط الأعداد", expected: "NL_ge_9", options: ["NL_ge_9", "NL_le_9", "NL_gt_9", "NL_lt_9"], userInstruction: "سؤال تدريبي: مثل الحل على خط الأعداد", hint: "العلامة ≥ تعني دائرة مغلقة لليمين", success: "رائع!" }
                    ]
                }
            }
        ]
    },
    {
        level: 2,
        title: "المستوى الثاني: التمكن",
        questions: [
            {
                skill: "معادلات مع أقواس (التوزيع)",
                tutorial: {
                    title: "شرح قبل البدء: معادلات مع أقواس",
                    equation: "$$3(x - 2) = 15$$",
                    steps: [
                        { text: "أولاً: نستخدم خاصية التوزيع للتخلص من القوس بضرب العدد خارجه بما داخله.", math: "$$3x - 6 = 15$$" },
                        { text: "ثانياً: نجمع 6 للطرفين للتخلص من الثابت.", math: "$$3x = 21$$" },
                        { text: "ثالثاً: نقسم الطرفين على 3 لنجد قيمة x.", math: "$$x = 7$$" }
                    ]
                },
                equation: "$$2(x - 5) = 20$$",
                steps: [
                    { skill: "توزيع الضرب على الجمع والطرح (أقواس)", expected: "2x - 10 = 20", options: ["2x - 5 = 20", "2x - 10 = 20", "2x + 10 = 20", "x - 10 = 20"], userInstruction: "استخدم خاصية التوزيع للتخلص من الأقواس", hint: "اضرب 2 في x واضرب 2 في -5", success: "توزيع صحيح!" },
                    { skill: "التخلص من الثوابت الجبرية", expected: "2x = 30", options: ["2x = 10", "2x = 40", "2x = 30", "x = 30"], userInstruction: "تخلص من الثابت للطرف الآخر", hint: "اجمع 10 للطرفين", success: "خطوة موفقة." },
                    { skill: "القسمة على معامل كبير", expected: "x = 15", options: ["x = 15", "x = 60", "x = 10", "x = 5"], userInstruction: "اقسم على المعامل", hint: "اقسم الطرفين على 2", success: "بطل! لقد حللت المعادلة." }
                ],
                backup: {
                    equation: "$$3(x + 2) = 24$$",
                    steps: [
                        { skill: "توزيع الضرب على الجمع والطرح (أقواس)", expected: "3x + 6 = 24", options: ["3x + 2 = 24", "3x + 6 = 24", "x + 6 = 24", "3x - 6 = 24"], userInstruction: "سؤال تدريبي: وزّع 3 على القوس", hint: "اضرب 3 في x وفي 2", success: "توزيع صحيح!" },
                        { skill: "التخلص من الثوابت الجبرية", expected: "3x = 18", options: ["3x = 30", "3x = 18", "x = 18", "3x = 8"], userInstruction: "اطرح 6 من الطرفين", hint: "انقل +6 بعكس العملية", success: "خطوة موفقة." },
                        { skill: "القسمة على معامل كبير", expected: "x = 6", options: ["x = 6", "x = 8", "x = 18", "x = -6"], userInstruction: "أوجد قيمة x", hint: "اقسم الطرفين على 3", success: "بطل!" }
                    ]
                }
            },
            {
                skill: "الضرب التوزيعي مع معامل",
                tutorial: {
                    title: "شرح قبل البدء: توزيع مع معامل للمتغير",
                    equation: "$$4(2x - 1) = 20$$",
                    steps: [
                        { text: "وزع بضرب 4 في 2x و 4 في -1.", math: "$$8x - 4 = 20$$" },
                        { text: "اجمع 4 للطرفين.", math: "$$8x = 24$$" },
                        { text: "اقسم على 8.", math: "$$x = 3$$" }
                    ]
                },
                equation: "$$3(2x - 3) = 12$$",
                steps: [
                    { skill: "التوزيع المزدوج (معامل المتغير)", expected: "6x - 9 = 12", options: ["6x - 3 = 12", "6x - 9 = 12", "5x - 9 = 12", "6x + 9 = 12"], userInstruction: "وزع الـ 3 على القوس", hint: "اضرب 3 في 2x ثم 3 في -3", success: "ممتاز!" },
                    { skill: "التخلص من الثوابت الجبرية", expected: "6x = 21", options: ["6x = 3", "6x = 21", "x = 21", "6x = -21"], userInstruction: "اجمع 9 للطرفين", hint: "انقل -9 بعكس العملية", success: "صحيح!" },
                    { skill: "إيجاد الناتج في صورة كسرية", expected: "x = 21/6", options: ["x = 21/6", "x = 6/21", "x = 2", "x = 3"], userInstruction: "اقسم على معامل x", hint: "اقسم الطرفين على 6 (أو أوجد الناتج العشري 3.5)", success: "إجابة دقيقة!" }
                ]
            },
            {
                skill: "متباينات متعددة الخطوات",
                tutorial: {
                    title: "شرح قبل البدء: متباينات متعددة الخطوات",
                    equation: "$$4x + 2 > 14$$",
                    steps: [
                        { text: "تُحل المتباينة كالمعادلة طالما نقسم على موجب.", text: "" },
                        { text: "نطرح 2 من الطرفين.", math: "$$4x > 12$$" },
                        { text: "نقسم على 4.", math: "$$x > 3$$" },
                        { text: "عند خط الأعداد: العلامة > (بدون مساواة) تعني دائرة مفتوحة لليمين.", mathSVG: "NL_gt_3" }
                    ]
                },
                equation: "$$3x + 6 > 27$$",
                steps: [
                    { skill: "حل متباينة متعددة الخطوات - خطوة الجمع والطرخ", expected: "3x > 21", options: ["3x > 33", "3x < 21", "3x > 21", "x > 21"], userInstruction: "تخلص من +6 للطرفين", hint: "اطرح 6 من الطرفين ولا تغير علامة التباين", success: "عمل متقن!" },
                    { skill: "حل متباينة متعددة الخطوات - خطوة القسمة", expected: "x > 7", options: ["x < 7", "x > 7", "x > 18", "x > 6"], userInstruction: "أوجد قيمة x", hint: "اقسم الطرفين على 3", success: "إجابة دقيقة!" },
                    { skill: "تمثيل المتباينة على خط الأعداد المفتوح", expected: "NL_gt_7", options: ["NL_gt_7", "NL_lt_7", "NL_ge_7", "NL_le_7"], userInstruction: "مثل الحل على خط الأعداد", hint: "العلامة > تعني أن الدائرة مفتوحة للقيم الأكبر (اليمين)", success: "تمثيل رائع!" }
                ],
                backup: {
                    equation: "$$4x - 5 > 27$$",
                    steps: [
                        { skill: "حل متباينة متعددة الخطوات - خطوة الجمع والطرخ", expected: "4x > 32", options: ["4x < 32", "4x > 22", "4x > 32", "x > 32"], userInstruction: "سؤال تدريبي: اجمع 5 للطرفين", hint: "انقل -5 للطرف الآخر بالجمع", success: "صحيح!" },
                        { skill: "حل متباينة متعددة الخطوات - خطوة القسمة", expected: "x > 8", options: ["x < 8", "x > 8", "x > 7", "x > 28"], userInstruction: "أوجد المتباينة لـ x", hint: "اقسم على 4", success: "بطل!" },
                        { skill: "تمثيل المتباينة على خط الأعداد المفتوح", expected: "NL_gt_8", options: ["NL_gt_8", "NL_lt_8", "NL_ge_8", "NL_le_8"], userInstruction: "مثل المتباينة", hint: "الدائرة مفتوحة لليمين", success: "عمل متقن جداً!" }
                    ]
                }
            }
        ]
    },
    {
        level: 3,
        title: "المستوى الثالث: براعة التحدي",
        questions: [
            {
                skill: "توزيع عدد سالب والإشارات",
                tutorial: {
                    title: "شرح قبل البدء: توزيع عدد سالب والانتباه للإشارات",
                    equation: "$$-3(2x - 4) = 6$$",
                    steps: [
                        { text: "احذر هنا! سالب × موجب = سالب، وسالب × سالب = موجب.", math: "$$-6x + 12 = 6$$" },
                        { text: "نطرح 12 من الطرفين.", math: "$$-6x = -6$$" },
                        { text: "نقسم على سالب 6. (سالب تقسيم سالب = موجب).", math: "$$x = 1$$" }
                    ]
                },
                equation: "$$-4(2x - 6) = 2$$",
                steps: [
                    { skill: "توزيع عدد سالب واختلاف الإشارات", expected: "-8x + 24 = 2", options: ["-8x - 24 = 2", "-8x + 24 = 2", "8x + 24 = 2", "-6x - 24 = 2"], userInstruction: "وزع العدد السالب وانتبه للإشارات!", hint: "اضرب -4 في 2x واضرب -4 في -6 (سالب×سالب=موجب)", success: "تركيز عالي! توزيع الإشارات صحيح." },
                    { skill: "التخلص من الثوابت الجبرية", expected: "-8x = -22", options: ["-8x = 26", "-8x = -22", "8x = -22", "-8x = -26"], userInstruction: "انقل الثابت", hint: "اطرح 24 من الطرفين (2 - 24 = -22)", success: "خطوة صحيحة." },
                    { skill: "القسمة على رقم سالب مع كسر", expected: "x = 22/8", options: ["x = -22/8", "x = 22/8", "x = 2.5", "x = -2.75"], userInstruction: "اقسم الطرفين على -8 (أو اكتبه ككسر x=22/8)", hint: "-22 تقسيم -8 يعطيك رقماً موجباً", success: "عبقري! لقد تعاملت مع الأرقام السالبة والكسور." }
                ],
                backup: {
                    equation: "$$-2x + 3 = 9$$",
                    steps: [
                        { skill: "التخلص من الثوابت الجبرية", expected: "-2x = 6", options: ["-2x = 12", "-2x = 6", "2x = 6", "x = 6"], userInstruction: "سؤال تدريبي: اطرح 3 من الطرفين", hint: "انقل +3 بالطرح", success: "صحيح!" },
                        { skill: "القسمة على رقم سالب مع كسر", expected: "x = -3", options: ["x = 3", "x = -3", "x = -12", "x = 4"], userInstruction: "اقسم على عدد سالب", hint: "اقسم الطرفين على -2. تذكر موجب/سالب = سالب.", success: "ممتاز!" }
                    ]
                }
            },
            {
                skill: "القسمة على سالب في المتباينات (عكس الإشارة)",
                tutorial: {
                    title: "شرح قبل البدء: متباينات وقسمة على عدد سالب",
                    equation: "$$-2x < 10$$",
                    steps: [
                        { text: "(القاعدة الذهبية): عند القسمة على عدد سالب في متباينة، يجب عكس اتجاه الإشارة.", text: "" },
                        { text: "نقسم على -2 ونعكس الإشارة من أصغر إلى أكبر.", math: "$$x > -5$$" },
                        { text: "إشارة المتبيانة الآن > ، لذلك الدائرة مفتوحة والسهم يتجه لليمين.", mathSVG: "NL_gt_-5" }
                    ]
                },
                equation: "$$-3x < 9$$",
                steps: [
                    { skill: "القسمة على سالب في المتباينات (عكس الإشارة الاجباري)", expected: "x > -3", options: ["x < -3", "x > -3", "x > 3", "x < 3"], userInstruction: "اقسم على عدد سالب وانتبه لعلامة التباين!", hint: "عند القسمة على عدد سالب (-3) يجب أن تعكس إشارة التباين من أصغر إلى أكبر", success: "ممتاز جداً! تذكرت القاعدة الذهبية للمتباينات." },
                    { skill: "تمثيل المتباينة على خط الأعداد المفتوح لليسار", expected: "NL_gt_-3", options: ["NL_gt_-3", "NL_lt_-3", "NL_ge_-3", "NL_le_-3"], userInstruction: "مثل الحل على خط الأعداد", hint: "الآن المتباينة تشير إلى أن x أكبر من -3.", success: "خط أعداد رائع ومتقن." }
                ],
                backup: {
                    equation: "$$-5x \\ge 20$$",
                    steps: [
                        { skill: "القسمة على سالب في المتباينات (عكس الإشارة الاجباري)", expected: "x <= -4", options: ["x >= -4", "x <= -4", "x >= 4", "x <= 4"], userInstruction: "سؤال تدريبي: اقسم على سالب وانتبه بعناية!", hint: "تذكر قلب إشارة التباين من أكبر إلى أصغر", success: "أحسنت، لقد أتقنت الفكرة." },
                        { skill: "تمثيل المتباينة على خط الأعداد المغلق لليسار", expected: "NL_le_-4", options: ["NL_le_-4", "NL_ge_-4", "NL_lt_-4", "NL_gt_-4"], userInstruction: "سؤال تدريبي: مثل الحل النهائي", hint: "انتبه لعلامة ≤ الناتجة (دائرة مغلقة، لليسار)", success: "إجابة مثالية وخالية من العيوب." }
                    ]
                }
            }
        ]
    },
    {
        level: 4,
        title: "الاختبار النهائي (مراجعة شاملة)",
        questions: [
            {
                skill: "حل معادلة بخطوتين (الاختبار النهائي)",
                equation: "$$4x + 8 = 24$$",
                steps: [
                    { skill: "التخلص من الجمع والطرح المباشر", expected: "4x = 16", options: ["4x = 32", "4x = 16", "x = 16", "4x = -16"], userInstruction: "الاختبار النهائي: اطرح 8 من الطرفين", success: "صحيح!", hint: "تخلص من الموجب 8 بالطرح" },
                    { skill: "القسمة على رقم موجب", expected: "x = 4", options: ["x = 4", "x = 16", "x = 8", "x = 2"], userInstruction: "اقسم على معامل x", success: "ممتاز!", hint: "اقسم على 4" }
                ]
            },
            {
                skill: "معادلات مع أقواس (الاختبار النهائي)",
                equation: "$$2(x - 3) = 10$$",
                steps: [
                    { skill: "توزيع الضرب على الجمع والطرح (أقواس)", expected: "2x - 6 = 10", options: ["2x - 3 = 10", "2x - 6 = 10", "2x + 6 = 10", "x - 6 = 10"], userInstruction: "استخدم خاصية التوزيع للتخلص من الأقواس", success: "صحيح!", hint: "اضرب 2 في x واضرب 2 في -3" },
                    { skill: "التخلص من الثوابت الجبرية", expected: "2x = 16", options: ["2x = 4", "2x = 16", "x = 16", "2x = 13"], userInstruction: "اجمع 6 للطرفين", success: "صحيح!", hint: "انقل السالب للطرف الآخر بالجمع" },
                    { skill: "القسمة على معامل كبير", expected: "x = 8", options: ["x = 8", "x = 5", "x = 16", "x = -8"], userInstruction: "اقسم على معامل x", success: "ممتاز!", hint: "اقسم على 2" }
                ]
            },
            {
                skill: "المتباينات والتوزيع السالب (الاختبار النهائي)",
                equation: "$$-3x + 5 < -10$$",
                steps: [
                    { skill: "حل متباينة متعددة الخطوات - خطوة الجمع والطرخ", expected: "-3x < -15", options: ["-3x < -5", "-3x < -15", "3x < 15", "-3x > -15"], userInstruction: "اطرح 5 من الطرفين", success: "صحيح!", hint: "اطرح 5 من الطرفين: -10 - 5 = -15" },
                    { skill: "القسمة على سالب في المتباينات (عكس الإشارة الاجباري)", expected: "x > 5", options: ["x < 5", "x > 5", "x > -5", "x < -5"], userInstruction: "اقسم على -3 وانتبه للإشارة", success: "رائع!", hint: "عند القسمة على سالب أعكس اتجاه المتباينة!" },
                    { skill: "تمثيل المتباينة على خط الأعداد المفتوح", expected: "NL_gt_5", options: ["NL_gt_5", "NL_lt_5", "NL_ge_5", "NL_le_5"], userInstruction: "مثل الحل المستخرج على خط الأعداد", success: "إجابة شاملة وكاملة!", hint: "علامة أكبر > تعني دائرة مفتوحة لليمين" }
                ]
            }
        ]
    }
];

// حالة التطبيق
const appState = {
    studentName: "",
    currentLevelIndex: 0,
    currentQuestionIndex: 0,
    currentStepIndex: 0,
    score: 0,
    totalPossibleScore: 0, // أقصى درجة بناءً على عدد الأسئلة
    errors: 0,
    timeStarted: null,
    selectedAnswer: "",
    isBackupQuestion: false,
    madeErrorInCurrentQuestion: false,
    hasShownQuestionTutorial: false,
    failedSkills: []
};

// عناصر واجهة المستخدم
const elements = {
    screens: {
        login: document.getElementById('login-screen'),
        game: document.getElementById('game-screen'),
        end: document.getElementById('end-screen')
    },
    displays: {
        studentInfo: document.getElementById('student-info'),
        scoreInfo: document.getElementById('score-info'),
        nameOut: document.getElementById('student-name-display'),
        levelOut: document.getElementById('current-level-display'),
        scoreOut: document.getElementById('score-display'),
        totalScoreOut: document.getElementById('total-score-display'),
        progressBar: document.getElementById('progress-bar'),
        progressContainer: document.getElementById('progress-container')
    },
    game: {
        levelIndicator: document.getElementById('level-indicator'),
        questionText: document.getElementById('question-text'),
        stepsContainer: document.getElementById('steps-container'),
        instructionText: document.getElementById('instruction-text'),
        customSelectContainer: document.getElementById('custom-select-container'),
        selectSelected: document.getElementById('select-selected'),
        selectItems: document.getElementById('select-items'),
        feedbackMsg: document.getElementById('feedback-message'),
        tutorialContainer: document.getElementById('tutorial-container'),
        mainQuestionContainer: document.getElementById('main-question-container'),
        tutorialTitle: document.getElementById('tutorial-title'),
        tutorialEquation: document.getElementById('tutorial-equation'),
        tutorialStepsContainer: document.getElementById('tutorial-steps-container'),
        startLevelBtn: document.getElementById('start-level-btn')
    }
};

// الدالة المسؤولة عن بناء خط الأعداد بواسطة SVG
function generateNumberLineSVG(optStr) {
    const parts = optStr.split('_');
    const type = parts[1]; // ge, le, gt, lt
    const value = parts[2];

    const isClosed = (type === 'ge' || type === 'le');
    const isRight = (type === 'ge' || type === 'gt');

    // تصميم خط الأعداد التفاعلي كـ SVG
    let svg = `<svg viewBox="0 0 300 80" width="100%" height="80" xmlns="http://www.w3.org/2000/svg">`;
    // main line
    svg += `<line x1="20" y1="40" x2="280" y2="40" stroke="#94a3b8" stroke-width="3" />`;
    // arrows on main line
    svg += `<polygon points="20,40 30,33 30,47" fill="#94a3b8"/>`;
    svg += `<polygon points="280,40 270,33 270,47" fill="#94a3b8"/>`;

    // tick mark
    svg += `<line x1="150" y1="30" x2="150" y2="50" stroke="#64748b" stroke-width="2" />`;
    svg += `<text x="150" y="70" font-family="Arial, Tajawal, sans-serif" font-weight="bold" font-size="20" fill="#334155" text-anchor="middle">${value}</text>`;

    // The solution ray
    if (isRight) {
        svg += `<line x1="150" y1="40" x2="260" y2="40" stroke="#0ea5e9" stroke-width="7" opacity="0.8"/>`;
        svg += `<polygon points="270,40 250,28 250,52" fill="#0ea5e9"/>`;
    } else {
        svg += `<line x1="150" y1="40" x2="40" y2="40" stroke="#0ea5e9" stroke-width="7" opacity="0.8"/>`;
        svg += `<polygon points="30,40 50,28 50,52" fill="#0ea5e9"/>`;
    }

    // The circle
    if (isClosed) {
        svg += `<circle cx="150" cy="40" r="8" fill="#0ea5e9" stroke="#0284c7" stroke-width="2"/>`;
    } else {
        svg += `<circle cx="150" cy="40" r="8" fill="#ffffff" stroke="#0ea5e9" stroke-width="4"/>`;
    }

    svg += `</svg>`;
    return svg;
}

// الدالة المسؤولة عن حفظ البيانات وتحديث لوحة المعلم
function updateTeacherDashboard() {
    let studentData = {
        level: appState.currentLevelIndex + 1,
        score: appState.score,
        totalScore: appState.totalPossibleScore,
        errors: appState.errors,
        failedSkills: [...new Set(appState.failedSkills)],
        timeStarted: appState.timeStarted || new Date().toLocaleTimeString('ar-QA')
    };

    if (useFirebase && appState.studentName) {
        // الحفظ السحابي
        set(ref(db, 'students/' + appState.studentName), studentData).catch(error => {
            console.error("خطأ في حفظ البيانات سحابياً: ", error);
        });
    } else {
        // الحفظ المحلي (كبديل إذا لم تعمل السحابة)
        let studentsData = JSON.parse(localStorage.getItem('math_lesson_students')) || {};
        studentsData[appState.studentName] = studentData;
        localStorage.setItem('math_lesson_students', JSON.stringify(studentsData));
        if (typeof updateLiveLeaderboard === 'function') {
            updateLiveLeaderboard();
        }
    }
}

function updateLiveLeaderboard() {
    const listEl = document.getElementById('leaderboard-list');
    if (!listEl) return;

    let studentsData = JSON.parse(localStorage.getItem('math_lesson_students')) || {};
    let allStudents = [];

    // جلب الطلاب الحقيقيين من النظام (الذين دخلوا مسبقاً)
    for (const [name, data] of Object.entries(studentsData)) {
        if (name !== appState.studentName) {
            allStudents.push({ name: name, score: data.score, isCurrent: false });
        }
    }

    // دمج نقاط الطالب الحالي اللحظية
    if (appState.studentName) {
        allStudents.push({ name: appState.studentName, score: appState.score, isCurrent: true });
    }

    // ترتيب تنازلي حسب النقاط
    allStudents.sort((a, b) => b.score - a.score);

    // تحديث القائمة
    listEl.innerHTML = '';

    if (allStudents.length === 0) {
        return;
    }

    // عرض أصحاب المراكز الأولى، ويمكن أن يكون الطالب الوحيد
    allStudents.forEach((st, index) => {
        const item = document.createElement('li');
        item.className = `leaderboard-item ${st.isCurrent ? 'current-student' : ''}`;

        let rankHtml = `<div class="leaderboard-rank">${index + 1}</div>`;
        if (index === 0) rankHtml = `<div class="leaderboard-rank" style="background: #fbbf24;">1</div>`;
        else if (index === 1) rankHtml = `<div class="leaderboard-rank" style="background: #94a3b8;">2</div>`;
        else if (index === 2) rankHtml = `<div class="leaderboard-rank" style="background: #b45309;">3</div>`;

        item.innerHTML = `
            ${rankHtml}
            <div class="leaderboard-name">${st.name}</div>
            <div class="leaderboard-score">${st.score} <span style="font-size:0.8rem; color:#64748b;">نقطة</span></div>
        `;
        listEl.appendChild(item);
    });
}

// استماع للتحديثات في الشاشات (تبويبات متصفح) الأخرى إن كان هناك طلاب حقيقيون يلعبون موازياً
if (!useFirebase) {
    window.addEventListener('storage', (e) => {
        if (e.key === 'math_lesson_students') {
            if (typeof updateLiveLeaderboard === 'function') {
                updateLiveLeaderboard();
            }
        }
    });
}

// حساب أقصى درجة ممكنة
function calculateTotalPossibleScore() {
    let total = 0;
    levelsData.forEach(lvl => {
        lvl.questions.forEach(q => {
            // كل خطوة 10 نقاط
            total += (q.steps.length * 10);
            // إنهاء سؤال 20 نقطة
            total += 20;
        });
        // إنهاء مستوى 50 نقطة
        total += 50;
    });
    return total;
}

// بدء التحدي
document.getElementById('start-btn').addEventListener('click', () => {
    const nameInput = document.getElementById('student-name').value.trim();
    if (nameInput === "") {
        alert("الرجاء إدخال اسمك لبدء التحدي.");
        return;
    }

    appState.studentName = nameInput;
    appState.timeStarted = new Date().toLocaleTimeString('ar-QA', { hour: '2-digit', minute: '2-digit' });
    appState.totalPossibleScore = calculateTotalPossibleScore();

    // تحديث الواجهة
    elements.displays.nameOut.textContent = appState.studentName;
    if (elements.displays.totalScoreOut) {
        elements.displays.totalScoreOut.textContent = appState.totalPossibleScore;
    }
    elements.displays.studentInfo.classList.remove('hidden');
    elements.displays.scoreInfo.classList.remove('hidden');
    elements.displays.progressContainer.classList.remove('hidden');

    // إخفاء الشاشة الحالية وإظهار شاشة اللعب والسباق
    elements.screens.login.classList.remove('active');
    elements.screens.game.classList.remove('hidden');
    elements.screens.game.classList.add('active');

    // إظهار لوحة الصدارة
    const sidebar = document.getElementById('leaderboard-sidebar');
    if (sidebar) sidebar.classList.add('active');

    appState.hasShownQuestionTutorial = false;
    checkAndShowTutorial();
    updateTeacherDashboard();
});

// إظهار الشرح التفاعلي (متحرك)
function checkAndShowTutorial() {
    const currentLevel = levelsData[appState.currentLevelIndex];
    const currentQuestion = currentLevel.questions[appState.currentQuestionIndex];

    if (currentQuestion.tutorial && !appState.hasShownQuestionTutorial && !appState.isBackupQuestion) {
        // إظهار الشرح وإخفاء الأسئلة
        elements.game.mainQuestionContainer.classList.add('hidden');
        elements.game.tutorialContainer.classList.remove('hidden');
        elements.game.levelIndicator.textContent = currentLevel.title;

        elements.game.tutorialTitle.textContent = currentQuestion.tutorial.title;
        elements.game.tutorialEquation.innerHTML = currentQuestion.tutorial.equation;
        elements.game.tutorialStepsContainer.innerHTML = '';
        elements.game.startLevelBtn.classList.add('hidden');

        if (window.MathJax) {
            MathJax.typesetPromise([elements.game.tutorialEquation]).catch(err => console.log(err));
        }

        // تحريك الخطوات بفاصل زمني
        let delay = 1000;
        currentQuestion.tutorial.steps.forEach((step, index) => {
            setTimeout(() => {
                const stepDiv = document.createElement('div');
                stepDiv.className = 'tutorial-step';
                let mathHtml = '';
                if (step.math) {
                    mathHtml = `<div class="tutorial-step-math">${step.math}</div>`;
                } else if (step.mathSVG) {
                    mathHtml = `<div class="tutorial-step-math" style="background:none; border: 2px solid #bae6fd;">${generateNumberLineSVG(step.mathSVG)}</div>`;
                }

                stepDiv.innerHTML = `
                    <div class="tutorial-step-text">${step.text}</div>
                    ${mathHtml}
                `;
                elements.game.tutorialStepsContainer.appendChild(stepDiv);

                if (window.MathJax && step.math) {
                    MathJax.typesetPromise([stepDiv]).catch(err => console.log(err));
                }

                // عرض بطريقة انسيابية  Fade-in
                setTimeout(() => {
                    stepDiv.classList.add('visible');
                }, 100);

                // إظهار زر البدء في النهاية
                if (index === currentQuestion.tutorial.steps.length - 1) {
                    setTimeout(() => {
                        elements.game.startLevelBtn.classList.remove('hidden');
                    }, 500);
                }
            }, delay);
            delay += 2500; // 2.5 ثانية بين كل خطوة ليتسنى للطالب قراءتها
        });

    } else {
        startQuestion();
    }
}

document.getElementById('start-level-btn').addEventListener('click', () => {
    appState.hasShownQuestionTutorial = true;
    startQuestion();
});

function startQuestion() {
    elements.game.tutorialContainer.classList.add('hidden');
    elements.game.mainQuestionContainer.classList.remove('hidden');
    loadQuestion();
}

// إعداد القائمة المنسدلة المخصصة
elements.game.selectSelected.addEventListener('click', function (e) {
    e.stopPropagation();
    elements.game.selectItems.classList.toggle('select-hide');
    this.classList.toggle('select-arrow-active');
});

function closeAllSelect() {
    elements.game.selectItems.classList.add('select-hide');
    elements.game.selectSelected.classList.remove('select-arrow-active');
}
document.addEventListener('click', closeAllSelect);

// خلط المصفوفة (Randomize)
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// تحميل السؤال الحالي
function loadQuestion() {
    const currentLevel = levelsData[appState.currentLevelIndex];
    let currentQuestion = currentLevel.questions[appState.currentQuestionIndex];

    // إذا كان في وضع السؤال التدريبي، استخدم بيانات الـ backup عوضاً عن السؤال الأصلي
    if (appState.isBackupQuestion && currentQuestion.backup) {
        currentQuestion = currentQuestion.backup;
    }

    const currentStepObj = currentQuestion.steps[appState.currentStepIndex];

    // تحديث المؤشرات
    elements.displays.levelOut.textContent = (appState.currentLevelIndex + 1);
    elements.game.levelIndicator.textContent = currentLevel.title;
    elements.game.questionText.textContent = `حل: ${currentQuestion.equation}`;

    // تحديث التعليمات للخطوة الحالية
    elements.game.instructionText.textContent = currentStepObj.userInstruction;

    // تعبئة الخيارات في القائمة المنسدلة المخصصة
    elements.game.selectSelected.innerHTML = 'اختر الخطوة التالية...';
    elements.game.selectItems.innerHTML = '';
    appState.selectedAnswer = '';

    // خلط الخيارات المتاحة
    let options = [...currentStepObj.options];
    options = shuffleArray(options);

    options.forEach(opt => {
        const optionDiv = document.createElement('div');

        if (opt.startsWith("NL_")) {
            // Number Line SVG
            optionDiv.innerHTML = generateNumberLineSVG(opt);
            optionDiv.style.width = "100%";
            optionDiv.style.cursor = "pointer";
            optionDiv.style.marginBottom = "-5px"; // tweaks
        } else {
            // تحويل الخيار إلى ليتيك للصورة
            let latexOpt = opt.replace('>=', '\\ge').replace('<=', '\\le');
            if (latexOpt.includes('≥')) latexOpt = latexOpt.replace('≥', '\\ge');
            if (latexOpt.includes('≤')) latexOpt = latexOpt.replace('≤', '\\le');

            optionDiv.innerHTML = `$$${latexOpt}$$`;
        }

        optionDiv.addEventListener('click', function () {
            elements.game.selectSelected.innerHTML = this.innerHTML;
            appState.selectedAnswer = opt; // القيمة الحقيقية للمقارنة
            closeAllSelect();
            if (window.MathJax && !opt.startsWith('NL_')) {
                MathJax.typesetPromise([elements.game.selectSelected]).catch((err) => console.log(err.message));
            }
        });

        elements.game.selectItems.appendChild(optionDiv);
    });

    elements.game.feedbackMsg.className = "feedback";

    // تحديث شريط التقدم (بناءً على إجمالي الأسئلة في كل المستويات)
    const totalQuestions = levelsData.reduce((acc, curr) => acc + curr.questions.length, 0);
    // تقريبي سريع للإنجاز
    let completedQuestions = 0;
    for (let i = 0; i < appState.currentLevelIndex; i++) completedQuestions += levelsData[i].questions.length;
    completedQuestions += appState.currentQuestionIndex;

    const progressPercent = (completedQuestions / totalQuestions) * 100;
    elements.displays.progressBar.style.width = `${progressPercent}%`;

    updateTeacherDashboard();

    // Render MathJax equations
    if (window.MathJax) {
        MathJax.typesetPromise([elements.game.questionText, elements.game.selectItems]).catch((err) => console.log(err.message));
    }
}

// تنظيف أو إزالة مسافات لتبسيط مقارنة المعادلات
function normalizeEquation(eq) {
    if (!eq) return "";
    if (eq.startsWith("NL_")) return eq; // Number lines string don't need normalize

    let normalized = eq.replace(/\s+/g, '').toUpperCase();
    // تحويل العلامات لتسهيل المقارنة (في حال اختلفت إدخالات الطلاب أو الخيارات)
    normalized = normalized.replace('>=', '≥').replace('<=', '≤');
    return normalized;
}

// التحقق من الإجابة
document.getElementById('check-btn').addEventListener('click', checkAnswer);
// إزالة حدث Enter لأننا نستخدم القائمة المنسدلة الآن

function checkAnswer() {
    const userInput = appState.selectedAnswer;

    if (!userInput) {
        alert("الرجاء اختيار إجابة من القائمة أولاً.");
        return;
    }

    const normalizedInput = normalizeEquation(userInput);

    const currentLevel = levelsData[appState.currentLevelIndex];
    let currentQuestion = currentLevel.questions[appState.currentQuestionIndex];
    if (appState.isBackupQuestion && currentQuestion.backup) {
        currentQuestion = currentQuestion.backup;
    }

    const currentStepObj = currentQuestion.steps[appState.currentStepIndex];
    const expectedAnswer = normalizeEquation(currentStepObj.expected);

    const feedbackEl = elements.game.feedbackMsg;

    if (normalizedInput === expectedAnswer || (normalizedInput.includes('22/8') && expectedAnswer.includes('2.75'))) {
        // الإجابة صحيحة
        appState.score += 10;
        elements.displays.scoreOut.textContent = appState.score;

        feedbackEl.textContent = currentStepObj.success;
        feedbackEl.className = "feedback success";

        // إضافة الخطوة للشاشة كخطوة مكتملة
        const stepCard = document.createElement('div');
        stepCard.className = 'step-card';

        if (expectedAnswer.startsWith("NL_")) {
            stepCard.innerHTML = `<span class="step-text">${currentStepObj.userInstruction}</span> <div class="step-math-svg" style="width:250px; display:inline-block; border-radius: 8px; background:white; border: 2px solid #bae6fd;">${generateNumberLineSVG(currentStepObj.expected)}</div>`;
        } else {
            // تحويل الخطوة الناجحة إلى معادلة LaTeX (تحويل >= إلى \ge)
            let latexEq = expectedAnswer.replace('>=', '\\ge').replace('<=', '\\le');
            if (latexEq.includes('≥')) latexEq = latexEq.replace('≥', '\\ge');
            if (latexEq.includes('≤')) latexEq = latexEq.replace('≤', '\\le');
            stepCard.innerHTML = `<span class="step-text">${currentStepObj.userInstruction}</span> <span class="step-math">$$${latexEq}$$</span>`;
        }

        elements.game.stepsContainer.appendChild(stepCard);

        if (window.MathJax && !expectedAnswer.startsWith("NL_")) {
            MathJax.typesetPromise([stepCard]).catch((err) => console.log(err.message));
        }

        // التحديث للخطوة/السؤال/المستوى التالي
        appState.currentStepIndex++;

        if (appState.currentStepIndex >= currentQuestion.steps.length) {
            // انتهى السؤال المكون من عدة خطوات
            appState.currentStepIndex = 0;

            // تحقق مما إذا أخطأ الطالب في السؤال وإذا كان لديه سؤال احتياطي
            if (appState.madeErrorInCurrentQuestion && !appState.isBackupQuestion && levelsData[appState.currentLevelIndex].questions[appState.currentQuestionIndex].backup) {
                // تفعيل السؤال التدريبي
                appState.isBackupQuestion = true;
                appState.madeErrorInCurrentQuestion = false;
                alert("ممتاز لأنك أكملت السؤال! لأنك واجهت بعض الصعوبات، سنعطيك سؤالاً مشابهاً للتدريب.");
            } else {
                // الانتقال للسؤال الأصلي التالي
                appState.currentQuestionIndex++;
                appState.isBackupQuestion = false;
                appState.madeErrorInCurrentQuestion = false;
                appState.score += 20; // مكافأة إنهاء سؤال
            }

            // تأخير بسيط للانتقال للسؤال التالي
            setTimeout(() => {
                elements.game.stepsContainer.innerHTML = ''; // مسح الخطوات القديمة

                if (appState.currentQuestionIndex >= currentLevel.questions.length) {
                    // انتهى المستوى
                    appState.currentQuestionIndex = 0;
                    appState.currentLevelIndex++;
                    appState.score += 50; // مكافأة إتمام مستوى

                    if (appState.currentLevelIndex >= levelsData.length) {
                        endGame();
                    } else {
                        // إشعار بالانتقال لمستوى جديد
                        alert(`مبروك! لقد انتقلت إلى المستوى ${appState.currentLevelIndex + 1} 🚀`);
                        appState.hasShownQuestionTutorial = false; // إعادة تعيين لرؤية شرح السؤال الأول من المستوى الجديد
                        checkAndShowTutorial();
                    }
                } else {
                    appState.hasShownQuestionTutorial = false; // إعادة تعيين لرؤية شرح السؤال الجديد
                    checkAndShowTutorial();
                }
            }, 1000);
        } else {
            // الانتقال للخطوة التالية في نفس السؤال
            setTimeout(() => {
                const nextStep = currentQuestion.steps[appState.currentStepIndex];
                elements.game.instructionText.textContent = nextStep.userInstruction;

                // تحديث الخيارات للخطوة الجديدة
                elements.game.selectSelected.innerHTML = 'اختر الخطوة التالية...';
                elements.game.selectItems.innerHTML = '';
                appState.selectedAnswer = '';

                let options = shuffleArray([...nextStep.options]);
                options.forEach(opt => {
                    const optionDiv = document.createElement('div');

                    if (opt.startsWith("NL_")) {
                        optionDiv.innerHTML = generateNumberLineSVG(opt);
                        optionDiv.style.width = "100%";
                        optionDiv.style.cursor = "pointer";
                        optionDiv.style.marginBottom = "-5px";
                    } else {
                        let latexOpt = opt.replace('>=', '\\ge').replace('<=', '\\le');
                        if (latexOpt.includes('≥')) latexOpt = latexOpt.replace('≥', '\\ge');
                        if (latexOpt.includes('≤')) latexOpt = latexOpt.replace('≤', '\\le');

                        optionDiv.innerHTML = `$$${latexOpt}$$`;
                    }

                    optionDiv.addEventListener('click', function () {
                        elements.game.selectSelected.innerHTML = this.innerHTML;
                        appState.selectedAnswer = opt;
                        closeAllSelect();
                        if (window.MathJax && !opt.startsWith('NL_')) {
                            MathJax.typesetPromise([elements.game.selectSelected]).catch((err) => console.log(err.message));
                        }
                    });
                    elements.game.selectItems.appendChild(optionDiv);
                });

                if (window.MathJax) {
                    MathJax.typesetPromise([elements.game.selectItems]).catch((err) => console.log(err.message));
                }

                feedbackEl.className = "feedback";
            }, 1000);
        }

    } else {
        // الإجابة خاطئة - تقديم لمحة (تغذية راجعة)
        appState.errors++;
        appState.score = Math.max(0, appState.score - 5); // تقليل النقاط للتحفيز على الحذر
        appState.madeErrorInCurrentQuestion = true; // تسجيل الخطأ لاقتراح سؤال تدريبي لاحقاً

        // تسجيل المهارة الدقيقة للخطوة (الخطأ الشائع)، أو مهارة السؤال العامة
        const skillToRecord = currentStepObj.skill || currentQuestion.skill;
        if (skillToRecord && !appState.failedSkills.includes(skillToRecord)) {
            appState.failedSkills.push(skillToRecord);
        }

        elements.displays.scoreOut.textContent = appState.score;

        feedbackEl.innerHTML = `<strong>خطأ:</strong> حاول مرة أخرى! <br>💡 <em>تلميح:</em> ${currentStepObj.hint}`;
        feedbackEl.className = "feedback error";

        // تأثير اهتزاز وتفريغ الخيار الخاطئ لكي يختار الطالب من جديد
        const checkBtn = document.getElementById('check-btn');
        if (checkBtn) {
            checkBtn.classList.add('shake');
            setTimeout(() => checkBtn.classList.remove('shake'), 400);
        }

        elements.game.selectSelected.innerHTML = '<span style="color:#ef4444;">اختر إجابة أخرى...</span>';
        appState.selectedAnswer = '';
    }

    updateTeacherDashboard();
}

// نهاية التحدي
function endGame() {
    elements.screens.game.classList.remove('active');
    elements.screens.game.classList.add('hidden');
    elements.screens.end.classList.remove('hidden');
    elements.screens.end.classList.add('active');

    document.getElementById('final-score').textContent = appState.score;
    const finalTotalEl = document.getElementById('final-total-score');
    if (finalTotalEl) {
        finalTotalEl.textContent = appState.totalPossibleScore;
    }
    document.getElementById('final-level').textContent = "أنهيت جميع المستويات";

    elements.displays.progressBar.style.width = '100%';

    // التحديث الأخير للمعلم أن الطالب أتم كل شيء
    appState.currentLevelIndex = 4; // كقيمة رمزية للإكمال
    appState.currentLevelIndex = 3;
    updateTeacherDashboard();
}
