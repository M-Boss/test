FROM wordpress

WORKDIR /var/www/html


RUN mkdir blog
CMD pwd
CMD ls
CMD mv ./* blog
