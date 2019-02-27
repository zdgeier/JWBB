package com.vtblockchain.mobile.actions.note

import com.memtrip.eos.abi.writer.Abi
import com.memtrip.eos.abi.writer.ChildCompress

@Abi
data class NoteBody (
    val args: NoteArgs
) {

    val getArgs: NoteArgs
        @ChildCompress get() = args
}