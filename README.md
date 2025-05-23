# pinaronline-test-case

# Notes
- I use user_id instead of userId in points table. Because postgresql didn't accept this name: userId (userId => user_id, isActive => is_active)
- user_id should be integer(usually) but it's looking as string in task.
- I didn't make any pagination because i know, this is only test task.
- I use order by desc for tasks