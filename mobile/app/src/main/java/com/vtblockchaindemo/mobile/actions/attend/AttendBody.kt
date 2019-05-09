package com.vtblockchaindemo.mobile.actions.attend

import com.memtrip.eos.abi.writer.Abi
import com.memtrip.eos.abi.writer.ChildCompress

@Abi
data class AttendBody (
    val args: AttendArgs
) {

    val getArgs: AttendArgs
        @ChildCompress get() = args
}