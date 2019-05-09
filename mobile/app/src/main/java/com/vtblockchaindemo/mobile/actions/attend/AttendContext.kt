package com.vtblockchaindemo.mobile.actions.attend

import com.memtrip.eos.core.crypto.EosPrivateKey
import java.util.Date

data class AttendContext(
    val authorizingAccountName: String,
    val authorizingPrivateKey: EosPrivateKey,
    val expirationDate: Date
)