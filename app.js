const pageMeta = {
  chat: ["New learning chat", "学习诊断"],
  resources: ["Viewer", "学习资源"],
  quiz: ["Quiz", "练习测评"],
  path: ["Space", "学习路径"],
  knowledge: ["Knowledge", "课程知识库"],
  agents: ["Activity", "Agent 协作"],
  teacher: ["Teacher workspace", "教师看板"],
};

const profile = [
  ["专业年级", "计算机科学与技术 · 大二"],
  ["基础水平", "Python 基础一般，能写简单语法"],
  ["学习目标", "准备期末考试，快速补齐核心薄弱点"],
  ["薄弱知识点", "循环嵌套、函数参数、边界条件"],
  ["学习风格", "案例驱动，适合逐步推演"],
  ["资源偏好", "代码示例、分层练习、错因反馈"],
];

const resources = [
  {
    id: "lecture",
    title: "循环结构考前复习讲义",
    desc: "面向期末复习的个性化讲义",
    body: `
      <h2>循环结构考前复习讲义</h2>
      <p>本讲义围绕 for 循环、while 循环和循环嵌套展开，重点解决“执行次数数不清”和“变量更新位置混乱”的问题。</p>
      <ul>
        <li>先判断循环变量的初始值、终止条件和更新方式。</li>
        <li>嵌套循环中，内层循环会在外层每一轮里完整执行。</li>
        <li>遇到循环嵌套题，建议先画出 i、j、count 的逐步执行表。</li>
      </ul>
    `,
  },
  {
    id: "quiz",
    title: "分层练习题",
    desc: "基础题、进阶题、代码题",
    body: `
      <h2>分层练习题</h2>
      <ul>
        <li>基础题：判断 range(1, 6) 的循环次数。</li>
        <li>进阶题：分析双重循环中 print 的执行次数。</li>
        <li>代码题：编写函数统计列表中偶数个数。</li>
        <li>易错题：函数默认参数与实参传递。</li>
      </ul>
    `,
  },
  {
    id: "code",
    title: "代码案例",
    desc: "循环嵌套执行次数示例",
    body: `
      <h2>代码案例</h2>
      <pre class="code-block"><code>count = 0
for i in range(3):
    for j in range(2):
        count += 1
        print(i, j, count)

print("总执行次数:", count)</code></pre>
    `,
  },
  {
    id: "mindmap",
    title: "思维导图",
    desc: "知识点关系与复习顺序",
    body: `
      <h2>思维导图</h2>
      <div class="mindmap-list">
        <div class="mind-node"><strong>Python 期末复习</strong></div>
        <div class="mind-node">循环结构：for、while、break、continue</div>
        <div class="mind-node">循环嵌套：外层控制轮次，内层完整执行</div>
        <div class="mind-node">函数：参数、返回值、作用域</div>
        <div class="mind-node">综合练习：循环 + 函数 + 列表</div>
      </div>
    `,
  },
  {
    id: "reading",
    title: "拓展阅读",
    desc: "课程资料与实验资源",
    body: `
      <h2>拓展阅读</h2>
      <ul>
        <li>课程课件：第 4 章循环结构</li>
        <li>实验指导：实验 4-2 成绩批量处理</li>
        <li>易错题库：循环边界与函数返回值专题</li>
      </ul>
    `,
  },
];

const paths = [
  ["01", "复习 for/while 基础语法", "完成 2 道基础循环题", "20 分钟"],
  ["02", "画循环嵌套执行表", "推演 i、j、count 的变化", "30 分钟"],
  ["03", "练习函数参数与返回值", "完成 3 个函数改错题", "25 分钟"],
  ["04", "完成综合代码题", "写一个成绩区间统计程序", "40 分钟"],
];

const chapters = [
  ["第 1 章 Python 基础", ["变量", "数据类型", "输入输出"]],
  ["第 4 章 循环结构", ["for 循环", "while 循环", "循环嵌套", "break/continue"]],
  ["第 5 章 函数", ["参数", "返回值", "作用域", "默认参数"]],
  ["实验案例", ["成绩统计", "文件批处理", "数据可视化入门"]],
];

const agents = [
  ["诊", "学情诊断 Agent", "抽取学生画像，识别目标、基础、薄弱点和资源偏好。"],
  ["检", "知识检索 Agent", "检索 Python 课程知识库，命中循环结构、函数和实验资源。"],
  ["讲", "讲义生成 Agent", "生成个性化复习讲义和知识点解释。"],
  ["题", "题目生成 Agent", "生成分层练习题和答案解析。"],
  ["路", "路径规划 Agent", "根据错因和画像推荐下一步学习任务。"],
];

const teacherCards = [
  ["班级平均掌握度", "67%", "较上周提升 8%，循环结构仍需强化。"],
  ["高频薄弱点", "循环嵌套", "18 名学生在执行次数题上出错。"],
  ["AI 资源生成", "126", "包含讲义、题目、代码案例和导图。"],
];

let activeResource = "lecture";

const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => Array.from(document.querySelectorAll(selector));

function goPage(page) {
  $$(".page").forEach((item) => item.classList.remove("active"));
  $(`#${page}`).classList.add("active");
  $$(".rail-btn[data-page]").forEach((button) => button.classList.toggle("active", button.dataset.page === page));
  $("#pageKind").textContent = pageMeta[page][0];
  $("#pageTitle").textContent = pageMeta[page][1];
}

function renderProfile() {
  $("#profileGrid").innerHTML = profile
    .map(([label, value]) => `
      <div class="profile-card">
        <span>${label}</span>
        <strong>${value}</strong>
      </div>
    `)
    .join("");
}

function renderResources() {
  $("#resourceList").innerHTML = resources
    .map((resource) => `
      <button class="resource-item ${resource.id === activeResource ? "active" : ""}" data-resource="${resource.id}">
        <strong>${resource.title}</strong>
        <span>${resource.desc}</span>
      </button>
    `)
    .join("");

  const current = resources.find((item) => item.id === activeResource);
  $("#resourceReader").innerHTML = current.body;

  $$(".resource-item").forEach((button) => {
    button.addEventListener("click", () => {
      activeResource = button.dataset.resource;
      renderResources();
    });
  });
}

function renderQuiz() {
  $("#quizCard").innerHTML = `
    <h2>循环嵌套执行次数</h2>
    <p>下面代码中，print 一共会执行几次？</p>
    <pre class="code-block"><code>for i in range(3):
    for j in range(2):
        print(i, j)</code></pre>
    <div class="option-list">
      <label><input type="radio" name="quiz"> A. 3 次</label>
      <label><input type="radio" name="quiz"> B. 5 次</label>
      <label><input type="radio" name="quiz"> C. 6 次</label>
      <label><input type="radio" name="quiz"> D. 9 次</label>
    </div>
    <button class="primary-action" id="submitQuiz">提交答案</button>
    <div class="analysis" id="analysis">
      <strong>错因分析</strong>
      <p>如果只数外层循环，会误以为执行 3 次。正确思路是外层 3 次，内层每轮 2 次，总共 3 × 2 = 6 次。</p>
    </div>
  `;
  $("#submitQuiz").addEventListener("click", () => $("#analysis").classList.add("show"));
}

function renderPath() {
  $("#pathBoard").innerHTML = paths
    .map(([index, title, desc, time]) => `
      <div class="path-card">
        <div class="path-index">${index}</div>
        <div>
          <h3>${title}</h3>
          <p>${desc}</p>
        </div>
        <small>${time}</small>
      </div>
    `)
    .join("");
}

function renderKnowledge() {
  $("#chapterList").innerHTML = chapters
    .map(([chapter, tags]) => `
      <div class="chapter-card">
        <h3>${chapter}</h3>
        <div class="tag-list">${tags.map((tag) => `<span class="tag">${tag}</span>`).join("")}</div>
      </div>
    `)
    .join("");
}

function renderAgents() {
  $("#agentFlow").innerHTML = agents
    .map(([avatar, name, desc]) => `
      <div class="agent-card">
        <div class="agent-avatar">${avatar}</div>
        <div>
          <h3>${name}</h3>
          <p>${desc}</p>
        </div>
        <span class="status">Ready</span>
      </div>
    `)
    .join("");
}

function renderTeacher() {
  $("#teacherCards").innerHTML = teacherCards
    .map(([title, value, desc]) => `
      <div class="metric-card">
        <h3>${title}</h3>
        <span class="metric-value">${value}</span>
        <p>${desc}</p>
      </div>
    `)
    .join("");
}

function bindEvents() {
  $$(".rail-btn[data-page]").forEach((button) => button.addEventListener("click", () => goPage(button.dataset.page)));
  $$("[data-page-link]").forEach((button) => button.addEventListener("click", () => goPage(button.dataset.pageLink)));

  $("#diagnoseBtn").addEventListener("click", () => {
    $("#profileDrawer").classList.add("show");
    $("#profileDrawer").scrollIntoView({ behavior: "smooth", block: "center" });
  });

  $("#newChatBtn").addEventListener("click", () => {
    goPage("chat");
    $("#profileDrawer").classList.remove("show");
  });
}

function init() {
  renderProfile();
  renderResources();
  renderQuiz();
  renderPath();
  renderKnowledge();
  renderAgents();
  renderTeacher();
  bindEvents();
}

init();

