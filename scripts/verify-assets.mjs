import { access } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import {
  evidenceBlocks,
  portfolioData,
  projectGroups,
  resumeData,
  toolEvidenceBlocks,
} from '../src/data/portfolio.js';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const projectImages = projectGroups.flatMap((project) => project.images);
const expected = [
  '/assets/images/portrait-professional.png',
  ...projectImages.flatMap((item) => [item.src, item.thumb]),
];

if (projectImages.length !== 21) {
  throw new Error(`项目图片数量错误：应为21张，当前为${projectImages.length}张。`);
}

const orderedEvidenceImages = [
  ...evidenceBlocks.flatMap((block) => block.images),
  ...toolEvidenceBlocks.flatMap((block) => block.images),
];
const orderedNames = orderedEvidenceImages.map((item) =>
  path.basename(item.src).replace('.webp', ''),
);
const expectedNames = Array.from({ length: 21 }, (_, index) =>
  String(index + 1).padStart(2, '0'),
);

if (
  orderedNames.length !== 21 ||
  !orderedNames.every((name, index) => name.startsWith(`${expectedNames[index]}-`))
) {
  throw new Error('图片与文字佐证块的顺序错误，必须严格保持飞书简历中的01—21顺序。');
}

if (
  portfolioData.profileParagraphs.length !== 5 ||
  resumeData.mainExperience.facts.length !== 3 ||
  evidenceBlocks.length !== 8 ||
  resumeData.skills.length !== 3 ||
  toolEvidenceBlocks.length !== 3
) {
  throw new Error('完整简历文字结构缺失，请检查个人简介、工作成果、技能和自研工具。');
}

await Promise.all(
  expected.map((asset) =>
    access(path.join(root, 'public', asset.replace(/^\//, ''))).catch(() => {
      throw new Error(`缺少资源：${asset}`);
    }),
  ),
);

console.log(
  `资源检查通过：21张飞书项目图＋1张个人照片，共${expected.length}个文件；文字佐证块图片顺序为01—21。`,
);
