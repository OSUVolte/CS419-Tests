/*******************************************************************************
** Program Filename: testme.c
** Author: Jason Loomis
** Date: 4/24/16
** Description: CS 362, Quiz 2: Random Testing
*******************************************************************************/

#include<stdio.h>
#include<string.h>
#include<stdlib.h>
#include<time.h>


/* character set for random characters generated by inputChar() */
const char CHARSET[] = { ' ','(',')' ,'[' ,']' ,'a' ,'x' ,'{' ,'}' };

/* character set for random strings generated by inputString() */
const char STRINGSET[] = { '\0','e','r','s','t' };

/* length of the random string generated by inputString() */
#define STRINGLENGTH 6
/* global variable for use with inputString() to hold random generated strings */
char randomString[STRINGLENGTH + 1];


/*******************************************************************************
** Function: inputChar
** Description: Choose and output a random character from the CHARSET array.
** Parameters: None
** Pre-Conditions: rand() has been initialized by calling srand(),
**		CHARSET contains at least 1 character.
** Post-Conditions: returns the chosen random character
*******************************************************************************/
char inputChar()
{
	/* choose a random character from CHARSET */
	return CHARSET[rand() % sizeof(CHARSET)];
}


/*******************************************************************************
** Function: inputString
** Description: Generate a random string of length STRINGLENGTH, using the
**		characters defined in the STRINGSET array.
** Parameters: None
** Pre-Conditions: rand() has been initialized by calling srand(),
**		STRINGSET contains at least 1 character.
** Post-Conditions: populates the global variable randomString with the
**		generated string. The last character of the generated string will
**		always be \0 to ensure that the string is properly null-terminated.
**		Returns a pointer to the generated string (to the global variable).
*******************************************************************************/
char *inputString()
{
	int i;

	/* populate randomString[] with random characters from STRINGSET */
	for (i = 0; i < STRINGLENGTH; i++)
	{
		/* choose a random character from STRINGSET */
		randomString[i] = STRINGSET[rand() % sizeof(STRINGSET)];
	}

	/* ensure null-termination */
	randomString[STRINGLENGTH] = '\0';

	return randomString;
}


/*******************************************************************************
** Function: testme
** Description: randomly test a simple state machine algorithm.
** Parameters: None
** Pre-Conditions: rand() has been initialized by calling srand(),
**		Pre-conditions are met for inputChar() and inputString() functions.
** Post-Conditions: random characters and strings are generated until an error
**		condition is reached; the generated characters and strings are printed
**		to the stdout, along with the random test iteration and state machine
**		state.
*******************************************************************************/
void testme()
{
	int tcCount = 0;
	char *s;
	char c;
	int state = 0;
	while (1)
	{
		tcCount++;
		c = inputChar();
		s = inputString();
		printf("Iteration %d: c = %c, s = %s, state = %d\n", tcCount, c, s, state);

		if (c == '[' && state == 0) state = 1;
		if (c == '(' && state == 1) state = 2;
		if (c == '{' && state == 2) state = 3;
		if (c == ' '&& state == 3) state = 4;
		if (c == 'a' && state == 4) state = 5;
		if (c == 'x' && state == 5) state = 6;
		if (c == '}' && state == 6) state = 7;
		if (c == ')' && state == 7) state = 8;
		if (c == ']' && state == 8) state = 9;
		if (s[0] == 'r' && s[1] == 'e'
			&& s[2] == 's' && s[3] == 'e'
			&& s[4] == 't' && s[5] == '\0'
			&& state == 9)
		{
			printf("error ");
			exit(200);
		}
	}
}


/*******************************************************************************
** Function: main
** Description: main entrypoint.
** Parameters: None
** Pre-Conditions: None
** Post-Conditions: Random testing is performed and output is printed to stdout
*******************************************************************************/
int main(int argc, char *argv[])
{
	srand(time(NULL));
	testme();
	return 0;
}
