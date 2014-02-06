GoogleAppEngineProgressCounter
==============================

<h3>Purpose: </h3>

Multiple People are sharing one gmail account. Ex: contact@abc.org type. Tracking their performance on day to day basis.<br>

We assign label to every person. Mails are assigned to this label periodically. These mails are read,replied,moved to archive or other labels. Mails which were read today by each person are considered to be atteneded to. We track these numbers[i.e. Mails Read Today] in this APP.<br>

<h3>Labels Setup:</h3><br> We assign labels to each person in following fashion.<br>

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
    

<h3>Setup:</h3><br>
1) Assign Labels as described above.<br>
2) Add Sheets in current SpreadSheet by name of Team.<br>
3) Edit code to change Team names [Default: Team A, Team B, Team C (three teams)]<br>
4) Setup trigger for timedDBUpdate() just after midnight.<br>

<h3>Design Document</h3> <br>

Usage:<br>

Including People in Report:<br>
Every Label With Given Team-Name will be considered for this Report. 

Removing People from Report:<br>
Remove the Label from "Team X" and move it somewhere else.

Output:<br>
Report will contain Number of Unread Mails, Number of Replied Mail, Total Mail since a Base-TimeStamp, Currently 1 AM IST.

+ Optional Trigger for team status every hour.


Design:<br>

We take a snapshot of each label every day. The snapshot will contain Thread_ids and read/unread status for them.

We use yesterday's snapshot and comapre it with today's snapshot. Our aim is to get mails replied today.

1) Mails which were unread yesterday and are not longer present today: CountEm!<br>
2) Mails which are read today and were unread yesterday. CountEm!<br>
3) Mails which are read today and were not present yesterday. CountEm!<br>

Ignore the rest.





