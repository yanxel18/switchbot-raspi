#!/usr/bin/perl
use strict;
use warnings;

my($cmd, $process_name) = ("node ./python-host/switchbot-raspi/dist >> ./switchbot.log", "switchbot-raspi");

if (!`ps -eaf | grep $process_name | grep -v grep`){

        `$cmd &`;

        if (`ps -eaf | grep $process_name | grep -v grep`) {
                open my $log, ">>", './switchbot.log' or die "Can't open log file: $!";
                print $log "=================================================\n";
                print $log `ps -eaf | grep $process_name | grep -v grep`;
                print $log `date &`;
                print $log "\n";
        } else {
                open my $log, ">>", './switchbot.log' or die "Can't open log file: $!";
                print $log "=================================================\n";
                print $log "CANNOT RESTART SYSTEM_SCRIPT PROCESS! PLEASE CHECK SYSTEM!\n";
                print $log `date &`;
                print $log "\n";
        }
}
