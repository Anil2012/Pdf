import PDFMerger from 'pdf-merger-js';
const merger = new PDFMerger();
const mergePdfs = async(p1, p2) => {

await merger.add(p1);
await merger.add(p2);

await merger.save('public/merged.pdf');

// console.log('Merged successfully!');
}

// module.exports = {mergePdfs}
export { mergePdfs };
