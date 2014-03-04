var fs = require("fs")
  , path = require("path")
  , childProcess = require("child_process")
  , tilde = path.resolve.bind(path, process.env.HOME)
  , here = path.resolve.bind(path, __dirname)
  , dotfiles = [
      "zprofile",
      "exports",
      "functions",
      "gitconfig",
      "front"
    ]
  , brewSymlink

console.log("✨  dotfiles")

dotfiles.forEach(function(dotfile){
  var symlink = tilde("." + dotfile)
  console.log("✔︎ " + dotfile)
  if(fs.existsSync(symlink)) fs.unlinkSync(symlink)
  fs.symlinkSync(here(dotfile), symlink)
})

brewSymlink = tilde("Brewfile")
if(fs.existsSync(brewSymlink)) fs.unlinkSync(brewSymlink)
fs.symlinkSync(here("Brewfile"), brewSymlink)
console.log("✔︎ " + "Brewfile")

if(process.argv.indexOf("--npm") != -1){
  require("./npm").forEach(function(item){
    childProcess.execFile("npm", ["install", "-g", "--skip-installed", item], function(err, stdout, stderr){
      console.log(stdout)
    })
  })
}


