package com.vtblockchain.mobile

import com.memtrip.eos.core.crypto.EosPrivateKey
import java.util.Date

data class NoteContext(
    val authorizingAccountName: String,
    val authorizingPrivateKey: EosPrivateKey,
    val expirationDate: Date
)