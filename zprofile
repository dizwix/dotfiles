for file in ~/.{exports,front,functions}; do
  [ -r "$file" ] && [ -f "$file" ] && source "$file"
done
unset file
