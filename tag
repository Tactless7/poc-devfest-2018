#!/bin/bash
#
# Script pour passer d'un tag numéroté git à l'autre. Il faut que les tags
# soient sous la forme 'v-12' ou 'montag-89', avec un seul tiret.
#
# La commande `tag +` permet de passer au tag suivant et 'tag -` au précédent.
#
# Exemple:
#
# ```
#     $ git describe --tags
#     test-2
#     $ ./tag -
#     HEAD is now at tag test-1
#     $ ./tag +
#     HEAD is now at tag test-2
# ```

# either "+" or "-"
sign=$1

tag=$(git describe --tags)
prefix=$(echo $tag | cut -d "-" -f 1)
number=$(echo $tag | cut -d "-" -f 2)
new_tag=$prefix-$(( $number $sign 1 ))

git checkout $new_tag > /dev/null 2>&1 \
   && echo HEAD is now at tag $new_tag
