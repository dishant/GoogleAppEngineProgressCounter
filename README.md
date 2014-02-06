GoogleAppEngineProgressCounter
==============================

Purpose: Multiple People are sharing one gmail account. Ex: contact@abc.org type. Tracking their performance on day to day basis.

Setup: We assign labels to each person in following fashion.

Labels:<br>

Team A                  <---- Label<br>
Team A/John             <---- Nested Label under Team A<br>
Team A/Kerry            <--------|<br>
Team A/Katy<br>
Team B                  <--- Label<br>
Team B/Priscilla        <---- Nested Label under Team B<br>
Team B/Johny<br>
Team C<br>
Team C/Hugh<br>
Team C/Jake<br>
    
Mails which were read today by each person are considered to be atteneded to. We track these numbers[i.e. Mails Read Today] in this APP.

Design Document <br>

Usage:<br>

Including People in Report:<br>
Every Label With Given Team-Name will be considered for this Report. 

Removing People from Report:<br>
Remove the Label from "Team X" and move it somewhere else.

Output:<br>
Report will contain Number of Unread Mails, Number of Replied Mail, Total Mail since a Base-TimeStamp, Currently 1 AM IST.

Setup Trigger after midnight for DBUpload();
+ Optional Trigger for team status every hour.


Design:<br>

We take a snapshot of each label every day. The snapshot will contain Thread_ids and read/unread status for them.

We use yesterday's snapshot and comapre it with today's snapshot. Our aim is to get mails replied today.

1) Mails which were unread yesterday and are not longer present today: CountEm!<br>
2) Mails which are read today and were unread yesterday. CountEm!<br>
3) Mails which are read today and were not present yesterday. CountEm!<br>

Ignore the rest.





