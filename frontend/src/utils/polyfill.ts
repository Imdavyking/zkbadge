if (typeof process !== "undefined") {
  if (!process.cwd) {
    process.cwd = () => "/";
  }
}
