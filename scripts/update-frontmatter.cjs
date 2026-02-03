const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

const [, , fileName, authorImage] = process.argv;

if (!fileName || !authorImage) {
  process.exit(1);
}

const filePath = path.resolve(process.cwd(), fileName);

if (!fs.existsSync(filePath)) {
  console.error(`File not found: ${filePath}`);
  process.exit(1);
}

function formatDate(date) {
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: '2-digit',
    year: 'numeric'
  }).replace(',', '');
}

const raw = fs.readFileSync(filePath, 'utf8');
const parsed = matter(raw);

const now = formatDate(new Date());

const data = { ...parsed.data, authorImage };

if (data.pubDate) {
  data.updatedDate = now;
} else {
  data.pubDate = now;
}

const output = matter.stringify(parsed.content, data);

fs.writeFileSync(filePath, output, 'utf8');