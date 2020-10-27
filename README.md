# UW Covid Emailer

This script will query https://securelink.labmed.uw.edu and check for COVID-19 test results for a given birthday and retrieval code.

It will monitor results for changes, and proactively send an email when changes are identified.

By default, COVID-19 results are only proactively shared if the results are positive.

With this script, you are notified as soon as results are entered into the system, regardless of whether they are positive or negative.

This script is designed to work specifically for tests administered by UW Medicine Laboratory Medicine through the City of Seattle.

This script is likely to become outdated and stop working at any time. Use of this script is entirely your own doing, and is for eduational purposes only.

The author of this script is not responsible for its use.

## Prerequisites

You must have [Node](https://nodejs.org/e) and NPM installed.

In order to receive emails, you must provide a username and password for a Gmail account that has [less secure apps enabled](https://support.google.com/accounts/answer/6010255?hl=en).

## Setup

1. Git clone this repository
2. Install all of the `npm` dependencies

    ```
    npm i
    ```

3. Create a `.env` file at root with the following information:
       
    ```
    DOB='MM/DD/YYYY' # your date of birth as registered with the testing facility
    CODE='XXXX-XXXX-XXXX-XXXX' # retrieval code provided by UW
    FROM=your_email@gmail.com # emails not sent if omitted
    PASS=your_gmail_password # emails not sent if omitted
    TO=recipient@email.com # or omit to send to FROM
    DELAY_HRS=numHours # provide a number of hours between requests, or omit to default to 1 hour
    ```

    - If you enter your `DOB` or `CODE` incorrectly you will never receive updated results.
    - If you enter your `FROM` or `PASS` incorrectly, or don't enable *less secure apps* you will not receive email notifications.

4. Start the script with:

    ```
    npm start
    ```

5. Let the script continue to run in the background.
    - As long as your computer is on and the script is running, it will continue to monitor your results once per hour.

    - As results are updated, you can look at `results.json` to see the changes.

    - When new results come in, an email will be sent to `TO`.

    - No personal information is sent in the email.