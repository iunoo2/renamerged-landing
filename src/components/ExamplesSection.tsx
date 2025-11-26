import { motion } from 'framer-motion';
import { FileText, ArrowRight } from 'lucide-react';

const examples = [
  {
    title: 'File Awal:',
    files: [
      {
        name: 'dokumen1.pdf',
        details: 'ID TKU = 1234567890123456789012, Nama = PT ABC, Nomor Faktur = 123456, Tanggal = 01-01-2025'
      },
      {
        name: 'dokumen2.pdf',
        details: 'ID TKU = 1234567890123456789012, Nama = PT ABC, Nomor Faktur = 123457, Tanggal = 02-01-2025'
      },
      {
        name: 'dokumen3.pdf',
        details: 'ID TKU = 9876543210987654321098, Nama = PT XYZ, Nomor Faktur = 123458, Tanggal = 03-01-2025'
      }
    ]
  },
  {
    title: 'Mode "Rename dan Merge":',
    description: 'File digabung berdasarkan ID TKU yang sama',
    results: [
      {
        original: 'dokumen1.pdf dan dokumen2.pdf',
        merged: 'PT ABC.pdf',
        output: 'ProcessedPDFs/1234567890123456789012/PT ABC.pdf'
      },
      {
        original: 'dokumen3.pdf',
        merged: 'PT XYZ.pdf',
        output: 'ProcessedPDFs/9876543210987654321098/PT XYZ.pdf'
      }
    ]
  },
  {
    title: 'Mode "Rename Saja" (Komponen: Nama Lawan Transaksi PLUS Nomor Faktur):',
    description: 'File direname tanpa digabung',
    results: [
      {
        original: 'dokumen1.pdf',
        renamed: 'PT ABC - 123456.pdf',
        output: 'ProcessedPDFs/1234567890123456789012/PT ABC - 123456.pdf'
      },
      {
        original: 'dokumen2.pdf',
        renamed: 'PT ABC - 123457.pdf',
        output: 'ProcessedPDFs/1234567890123456789012/PT ABC - 123457.pdf'
      },
      {
        original: 'dokumen3.pdf',
        renamed: 'PT XYZ - 123458.pdf',
        output: 'ProcessedPDFs/9876543210987654321098/PT XYZ - 123458.pdf'
      }
    ]
  }
];

export default function ExamplesSection() {
  return (
    <section className="relative py-16 sm:py-24 px-4">
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950" />

      <div className="relative z-10 max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12 sm:mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-blue-400 text-transparent bg-clip-text">
            Contoh Penggunaan
          </h2>
          <p className="text-gray-400 text-base sm:text-lg max-w-2xl mx-auto">
            Lihat bagaimana Renamerged memproses file PDF Anda
          </p>
        </motion.div>

        <div className="space-y-8 sm:space-y-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="bg-slate-800/30 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-6 sm:p-8"
          >
            <h3 className="text-xl sm:text-2xl font-bold text-white mb-6 flex items-center gap-2">
              <FileText className="text-purple-400" size={24} />
              {examples[0].title}
            </h3>
            <div className="space-y-4">
              {examples[0].files.map((file, index) => (
                <div key={index} className="bg-slate-900/50 rounded-lg p-4 border border-slate-700/30">
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-2 h-2 rounded-full bg-purple-500 mt-2" />
                    <div className="flex-1">
                      <code className="text-purple-400 font-mono text-sm sm:text-base">{file.name}</code>
                      <p className="text-gray-400 text-xs sm:text-sm mt-1 break-all">
                        : {file.details}.
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="bg-gradient-to-br from-purple-900/20 to-blue-900/20 backdrop-blur-sm border border-purple-500/30 rounded-2xl p-6 sm:p-8"
          >
            <h3 className="text-xl sm:text-2xl font-bold text-white mb-2 flex items-center gap-2">
              <ArrowRight className="text-blue-400" size={24} />
              {examples[1].title}
            </h3>
            <p className="text-gray-400 text-sm mb-6">{examples[1].description}</p>
            <div className="space-y-4">
              {examples[1].results.map((result, index) => (
                <div key={index} className="bg-slate-900/50 rounded-lg p-4 border border-blue-500/20">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <code className="text-gray-400 text-xs sm:text-sm font-mono">{result.original}</code>
                      <span className="text-gray-500">→</span>
                      <code className="text-blue-400 text-xs sm:text-sm font-mono font-semibold">{result.merged}</code>
                    </div>
                    <div className="pl-4 border-l-2 border-blue-500/30">
                      <span className="text-gray-500 text-xs">Output:</span>
                      <code className="text-gray-400 text-xs font-mono block mt-1 break-all">
                        {result.output}
                      </code>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-gradient-to-br from-purple-900/20 to-blue-900/20 backdrop-blur-sm border border-purple-500/30 rounded-2xl p-6 sm:p-8"
          >
            <h3 className="text-xl sm:text-2xl font-bold text-white mb-2 flex items-center gap-2">
              <ArrowRight className="text-purple-400" size={24} />
              {examples[2].title}
            </h3>
            <p className="text-gray-400 text-sm mb-6">{examples[2].description}</p>
            <div className="space-y-4">
              {examples[2].results.map((result, index) => (
                <div key={index} className="bg-slate-900/50 rounded-lg p-4 border border-purple-500/20">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <code className="text-gray-400 text-xs sm:text-sm font-mono">{result.original}</code>
                      <span className="text-gray-500">→</span>
                      <code className="text-purple-400 text-xs sm:text-sm font-mono font-semibold">{result.renamed}</code>
                    </div>
                    <div className="pl-4 border-l-2 border-purple-500/30">
                      <span className="text-gray-500 text-xs">Output:</span>
                      <code className="text-gray-400 text-xs font-mono block mt-1 break-all">
                        {result.output}
                      </code>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-8 text-center"
        >
          <div className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/30 rounded-lg px-4 py-2">
            <div className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
            <p className="text-blue-400 text-sm">
              Semua file otomatis diorganisir dalam folder berdasarkan ID TKU
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
