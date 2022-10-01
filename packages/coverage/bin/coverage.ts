import executeCoverage from './utils/execute-coverage';

const CWD: string = process.cwd();

await executeCoverage(CWD);
