Let's start with the README.

Can have the keep to the side if you want.

Let's start by listing all the things that can be an option.

Pull from the schedule template and the email.

Wake up
Brush
Shower
Take pills
Bike
Run
Play guitar
Clean apartment
Eat breakfast
Work out
Focused work time
Wordle
Lunch
Dinner
Soccer
Chess
Cod mobile
MotoGP
Drts
NY Times Article
Fifa game
Read
TV
Movie
Rubix cube
Motorcycle school
Job hunt
SCS building
Skateboard
Cricket
Scooter
Real estate stuff
Medical insurance
Going to gc
Going to the met
Going to Statue of Liberty lookout point
Going to chelsea piers/anywhere in chelsea
Stocks learning
Other iphone games
cod on ps5
CEO
CTO
Leader
Writer
Strategist
Inventor
Investor
Cooking
Bartending
Listening to music
Making music

Okay well we have listed out all the things that we can do. This is pretty comprehensive in my not so humble opinion. We must have football arrogance. We must be cocky. It is the only way for us.

The problem with existing todo lists is that they are not customized to me.

They get too long. I don't stick to them. Etc etc

We need to go slowly here. Because todo lists are actually super influential. Maybe the point of life is just being really good at knocking off items off of a todo list.

But it needs an engine. It needs a storm. To ruthlessly and relentlessly make progress.

I don't exactly have the full image in mind. But I think it will be super beneficial if we can crack this.

The goal is that we shouldn't be scared of the todo list.

The lock screen that we have currently is good. I don't think we should remove that or the schedule template. I think we should slowly build on the todo list schedule amalgam in the background. While sticking to the lock screen schedule.

We should treat this as sort of like an experiment. It is totally possible that this could be a total waste of time. But such is life.

Let's start by figuring out what the technical aspects should look like.

At the current moment, I think we should keep it super local.

Let's use a database though.

Or rather.

Let's not use a database.

We can just have it in a .txt file or something like that

It can literally just be in javascript or something.

Just vanilla html css javascript. Like the good ole days.

Back in my day....

Command to Swapnil (CTS): Make a new file

Ok so I did that. Now we will need to visualize this. We don't need to but it will be good to capture the information in some kind of data structure.

CTS: Find html template online

Ok set up and also linked javascript file.

Now what

We need to capture the data from the txt file in a data structure.

CTS: Find on online how to read from a file in javascript.

Anyways

Ran into a small hiccough. Low key should know this kinda stuff already.

But it is a learning experience. Would've found this from other google sources or reference materials. But this way we can make more progress during focused work time.

What's next?

Now we need to define the philosophy. The algorithm. The logic. The strategy.

Let's be very careful and very deliberate. We can be extremely verbose. We should be extremely verbose.

How do you envision actually using this?

I open up the html page.

I update the todo*list* repeatable and one_time

Then what?

Also does the ordering of the items matter?

Also what about deadlines?

Some things you will have to kind of raw dog.

Leave the deadlines kind of loose. The only real thing that is constant is the phone lock screen loop.

We want to be able to seamlessly integrate the todo investing schedule system with the todo list

It's not easy. At least for me.

But we can keep writing. We can keep thinking.

We can devote the writing block times to just writing here instead. It's functionally the same thing. And we can more done in less time.

But yeah we'll have to figure out some kind of structure with attached deadlines. Some kind of structure with ordering of the items. Which can be somewhat related to the attached deadlines.

The greedy strategy of earliest deadline first.

Did it in one of that software engineering project in Columbia, and learned about the greedy strategy in swe course in ucsd.

Earliest Deadline First (EDF) is a classic greedy strategy used in scheduling.
Core Idea
Always schedule the job (or task) that has the earliest deadline among the remaining jobs that can still meet their deadline.
Two Common Contexts

1. Job Sequencing with Deadlines (Algorithms)
   You have jobs with:

a deadline
a profit

Goal: Maximize total profit (or number of jobs) while finishing each job by its deadline (usually assuming unit time jobs).
Greedy strategy:

Sort jobs by deadline (earliest first).
Try to place each job in the latest possible free time slot before its deadline.
If no free slot exists before the deadline, skip the job.

This is optimal for the standard unit-time job sequencing problem. 2. Real-Time Scheduling (Operating Systems)
In real-time systems, Earliest Deadline First is a dynamic priority scheduling algorithm:

At every moment, the ready task with the earliest absolute deadline gets the CPU.
It is optimal for uniprocessor systems under certain conditions (if a feasible schedule exists, EDF will find one).

Which one are you referring to?

Job sequencing / algorithms homework?
Real-time systems / OS?
Something else?

I can give you the exact algorithm, pseudocode, or a worked example once I know the context.

Deliverables Round 1 (Set of 3):

> Visualize one time todo list - Done
> Set up functionality to add items to the todo lists - Done
> Set up functionality to export data to download them or export somehow

Deliverables Round 2 (Set of 3):

> Create repeatable functionality: user defines a time scope (default is a day) and then ShF grabs a list of items from saved information provided by the user, and then the user goes through and knocks them out one by one, and each is saved and timestamped when completed
>
> > Define UI for repeatable vs one time - Done Aug 11, 2026 9:21pm
> > For repeatable data make sure data can be captured within a time scope - Done Aug 12, 2026 6:47pm
> > Might need to switch to node or have a backend set up to track the time scope
> > Will need to take input from user the actual time scope
> > Add default time scope of a day
> > Verify that time scope logic actually works, as in should be locked in to the time scope and then what and then

     should do some kind of time scope thing. Might need to break this one down a bit more.

> > ShF should grab list of items within that timescope
> > Should track user going through and knocking them out. Should gain high confidence that this is being tracked well and even if

     server goes down data is saved. Data should be timestamped. Idk if I said that. Data should be timestamped.

> one time items. User can add items, user can also choose from a set of templates for quick suggestions, and then the user can make steady cuts to these items, each atomic task/cut will have a note associated. The user can add estimates for how many cuts it will take. 1000 cuts represents one tgk fell swoop. User can order the individual tasks as per priority
>
> > Create list of template items (can be from repeatables)
> > Add functionality for user to add steady cuts
> > Add ui to signify when 1000 cuts have been made
> > When adding a single task, create estimate of how many cuts it may take to bring down the single
> > Add counter for tgk fell swoops
> > Add functionality for user to order the individual tasks as per priority

> Make sure ShadowFox name is somewhere on there, also add ShF logo on thumbnail
>
> > Add ShadowFox to page
> > Add ShadowFox to thumbnail
> > Add ShadowFox logo to thumbnail and also on page
> > Add ShadowFox logo to page
