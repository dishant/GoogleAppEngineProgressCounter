GoogleAppEngineProgressCounter
==============================

Purpose: Multiple People are sharing one gmail account. Ex: contact@abc.org type. Tracking their performance on day to day basis.

Setup: We assign labels to each person in following fashion.

Labels:

Team A                  <---- Label\n
Team A/John             <---- Nested Label under Team A\n
Team A/Kerry            <--------|\n
Team A/Katy\n
Team B                  <--- Label
Team B/Priscilla        <---- Nested Label under Team B
Team B/Johny
Team C
Team C/Hugh
Team C/Jake
    
Mails which were read today by each person are considered to be atteneded to. We track these numbers[i.e. Mails Read Today] in this APP.

Design Document 

Usage:

Including People in Report:
Every Label With Given Team-Name will be considered for this Report. 

Removing People from Report:
Remove the Label from "Team X" and move it somewhere else.

Output:
Report will contain Number of Unread Mails, Number of Replied Mail, Total Mail since a Base-TimeStamp, Currently 1 AM IST.

Setup Trigger after midnight for DBUpload();
+ Optional Trigger for team status every hour.


Design:

We take a snapshot of each label every day. The snapshot will contain Thread_ids and read/unread status for them.

We use yesterday's snapshot and comapre it with today's snapshot. Our aim is to get mails replied today.

1) Mails which were unread yesterday and are not longer present today: CountEm!
2) Mails which are read today and were unread yesterday. CountEm!
3) Mails which are read today and were not present yesterday. CountEm!

Ignore the rest.





