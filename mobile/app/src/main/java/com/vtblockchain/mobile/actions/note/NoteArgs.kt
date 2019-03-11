package com.vtblockchain.mobile.actions.note

/**
 * Copyright 2013-present memtrip LTD.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import com.memtrip.eos.abi.writer.Abi
import com.memtrip.eos.abi.writer.AccountNameCompress
import com.memtrip.eos.abi.writer.FloatCompress
import com.memtrip.eos.abi.writer.IntCompress

@Abi
data class NoteArgs (
    val account: String,
    val xval: Float,
    val yval: Float,
    val crn: Int
) {

    val getAccount: String
        @AccountNameCompress get() = account

    val getXVal: Float
        @FloatCompress get() = xval

    val getYVal: Float
        @FloatCompress get() = yval

    val getCRN: Int
        @IntCompress get() = crn
}